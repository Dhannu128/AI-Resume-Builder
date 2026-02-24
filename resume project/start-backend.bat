@echo off
echo Starting Resume AI Backend...
cd /d "%~dp0resume-ai-backend"
echo Building the backend...
call mvn clean package -DskipTests
if %errorlevel% equ 0 (
    echo Backend built successfully! Starting the application...
    java -jar target/app.jar
) else (
    echo Backend build failed!
    pause
)