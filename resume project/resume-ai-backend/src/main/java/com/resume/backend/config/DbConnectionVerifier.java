package com.resume.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

@Configuration
public class DbConnectionVerifier {
    private static final Logger logger = LoggerFactory.getLogger(DbConnectionVerifier.class);
    private static final int MAX_RETRIES = 15;  // Reduced from 30
    private static final int RETRY_DELAY_SECONDS = 5;  // Reduced from 10

    @Bean
    public CommandLineRunner verifyDbConnection(ObjectProvider<DataSource> dataSourceProvider, SmartHealthIndicator healthIndicator) {
        return args -> {
            DataSource dataSource = dataSourceProvider.getIfAvailable();
            if (dataSource == null) {
                logger.info("No DataSource configured. Skipping DB verification.");
                healthIndicator.setDbReady(false);
                return;
            }
            logger.info("Starting database connection verification...");
            AtomicBoolean connected = new AtomicBoolean(false);
            
            for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                try (Connection conn = dataSource.getConnection()) {
                    if (conn.isValid(2)) {  // Reduced validation time
                        connected.set(true);
                        logger.info("✅ Database connection validated on attempt {}/{}", attempt, MAX_RETRIES);
                        healthIndicator.setDbReady(true);
                        return;
                    }
                } catch (SQLException e) {
                    logger.warn("⚠️ Database connection attempt {}/{} failed: {}", 
                        attempt, MAX_RETRIES, e.getMessage());
                }
                
                // Exit early if context isn't ready yet
                if (!healthIndicator.isRunning()) {
                    logger.error("Startup cancelled during DB connection attempts");
                    return;
                }
                
                TimeUnit.SECONDS.sleep(RETRY_DELAY_SECONDS);
            }
            
            logger.error("🚨 Failed to establish database connection after {} attempts", MAX_RETRIES);
            healthIndicator.setDbReady(false);
        };
    }
}