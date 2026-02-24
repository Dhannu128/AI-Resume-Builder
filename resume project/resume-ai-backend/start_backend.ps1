Write-Host "Starting Resume AI Backend..." -ForegroundColor Green
Write-Host ""

Write-Host "Checking Java version..." -ForegroundColor Cyan
java -version
Write-Host ""

Write-Host "Checking if JAR file exists..." -ForegroundColor Cyan
if (Test-Path "target/app.jar") {
    Write-Host "✅ JAR file found: target/app.jar" -ForegroundColor Green
} else {
    Write-Host "❌ JAR file not found. Building project..." -ForegroundColor Red
    mvn clean package -DskipTests
}
Write-Host ""

Write-Host "Checking if port 8080 is available..." -ForegroundColor Cyan
$portCheck = netstat -ano | findstr :8080
if ($portCheck) {
    Write-Host "⚠️  Port 8080 is already in use:" -ForegroundColor Yellow
    Write-Host $portCheck
    Write-Host "You may need to kill the existing process or use a different port." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting Spring Boot application with dev profile..." -ForegroundColor Cyan
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Green
Write-Host "Health check: http://localhost:8080/actuator/health" -ForegroundColor Green
Write-Host "API endpoint: http://localhost:8080/api/v1/resume" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the application with error handling
try {
    Write-Host "Executing: java -Dspring.profiles.active=dev -jar target/app.jar" -ForegroundColor Cyan
    java -Dspring.profiles.active=dev -jar target/app.jar
} catch {
    Write-Host "❌ Error starting backend:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
