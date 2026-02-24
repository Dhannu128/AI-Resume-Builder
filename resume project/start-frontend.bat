@echo off
echo Starting Resume AI Frontend...
cd /d "%~dp0resume-frontend"
echo Installing dependencies...
call npm install --legacy-peer-deps
if %errorlevel% equ 0 (
    echo Dependencies installed! Starting the development server...
    call npm run dev
) else (
    echo Frontend setup failed!
    pause
)