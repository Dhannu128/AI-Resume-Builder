# Stage 1: Build with Maven
FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Clean Maven cache
RUN rm -rf /root/.m2/repository

COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built JAR from builder
COPY --from=builder /app/target/*.jar ./app.jar

# Expose default port (Railway uses $PORT, but fallback to 8080 for local)
EXPOSE 8080

# HEALTHCHECK — use the same PORT variable that Railway sets
# and allow 90s startup period for DB connection retries
HEALTHCHECK --interval=15s --timeout=5s --start-period=90s \
  CMD sh -c "curl -f http://localhost:${PORT:-8080}/actuator/health || exit 1"

# Create non-root user and set permissions
RUN groupadd -r spring && useradd -r -g spring spring && chown spring:spring ./app.jar
USER spring

# Start Spring Boot app, binding to $PORT
ENTRYPOINT ["sh", "-c", "java -Dspring.main.banner-mode=console -Dserver.port=${PORT:-8080} -jar app.jar"]
