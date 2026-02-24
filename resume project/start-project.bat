@echo off
echo ===== Resume AI Project Startup =====
echo.
echo This will start both backend and frontend servers.
echo Backend will run on: http://localhost:8080
echo Frontend will run on: http://localhost:5173
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

echo Starting backend server...
start "Resume AI Backend" cmd /k "%~dp0start-backend.bat"

echo Waiting 30 seconds for backend to start...
timeout /t 30 /nobreak

echo Starting frontend server...
start "Resume AI Frontend" cmd /k "%~dp0start-frontend.bat"

echo.
echo Both servers are starting!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Check the opened command windows for any errors.
pause