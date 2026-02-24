@echo off
echo Starting Resume AI Backend...
echo.

echo Checking Java version...
java -version
echo.

echo Starting Spring Boot application...
java -Dspring.profiles.active=dev -Dserver.port=8080 -jar target/app.jar

pause
