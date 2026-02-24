package com.resume.backend.config;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.actuate.health.Status;
import org.springframework.context.SmartLifecycle;
import org.springframework.stereotype.Component;

@Component
public class SmartHealthIndicator implements HealthIndicator, SmartLifecycle {

    private volatile boolean contextReady = false;
    private volatile boolean dbReady = false;
    private volatile boolean running = false;
    private long startTime;

    @Override
    public void start() {
        this.startTime = System.currentTimeMillis();
        this.running = true;
        System.out.println("[UPI Shield] Startup phase initiated.");
    }

    @Override
    public Health health() {
        long uptimeInSeconds = (System.currentTimeMillis() - startTime) / 1000;

        if (!contextReady) {
            return Health.status(new Status("starting", "Application context is still initializing"))
                         .withDetail("uptime", uptimeInSeconds + "s")
                         .withDetail("progress", "30%")
                         .build();
        }

        if (!dbReady) {
            return Health.status(new Status("waiting", "Database not connected yet"))
                         .withDetail("uptime", uptimeInSeconds + "s")
                         .withDetail("progress", "70%")
                         .build();
        }

        return Health.up()
                     .withDetail("status", "Application fully operational")
                     .withDetail("uptime", uptimeInSeconds + "s")
                     .build();
    }

    public void setContextReady() {
        this.contextReady = true;
        long seconds = (System.currentTimeMillis() - startTime) / 1000;
        System.out.println("[UPI Shield] Application context ready in " + seconds + "s.");
    }

    public void setDbReady(boolean ready) {
        this.dbReady = ready;
        long seconds = (System.currentTimeMillis() - startTime) / 1000;
        System.out.println("[UPI Shield] Database " + (ready ? "connected" : "connection failed") + " in " + seconds + "s.");
    }

    @Override public void stop() { this.running = false; }
    @Override public boolean isRunning() { return running; }
    @Override public int getPhase() { return Integer.MAX_VALUE; }
}
