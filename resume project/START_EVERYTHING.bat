@echo off
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   🚀 AI RESUME MAKER - STARTING ALL SERVERS           ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo [1/3] 📦 Building Backend...
cd /d "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)
echo ✅ Backend built successfully!
echo.

echo [2/3] 🚀 Starting Backend Server...
cd /d "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
start "Backend Server" cmd /k "java -jar target\app.jar"
echo ✅ Backend starting in new window...
echo ⏱️ Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak
echo.

echo [3/3] 🎨 Starting Frontend Server...
cd /d "d:\personal\Resume Ai maker\resume project\resume-frontend"
start "Frontend Server" cmd /k "npm run dev"
echo ✅ Frontend starting in new window...
echo.

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   ✅ SERVERS STARTED SUCCESSFULLY!                    ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 🌐 Backend:  http://localhost:8080
echo 🎨 Frontend: http://localhost:5173
echo.
echo 📝 Opening browser in 5 seconds...
timeout /t 5 /nobreak
start http://localhost:5173
echo.
echo ℹ️ Both servers are running in separate windows
echo ℹ️ Press Ctrl+C in each window to stop them
echo.
pause
