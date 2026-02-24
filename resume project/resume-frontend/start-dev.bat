@echo off
echo Starting AI Resume Generator Frontend...
echo.
echo Checking if backend is running...
curl -s http://localhost:8080/actuator/health > nul
if %errorlevel% neq 0 (
    echo WARNING: Backend not detected at http://localhost:8080
    echo Make sure your Spring Boot backend is running!
    echo.
)

echo Starting frontend development server...
npm run dev
