Write-Host "Starting Resume AI Frontend..." -ForegroundColor Green
Set-Location "f:\Resume Ai maker\resume project\resume-frontend"

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed! Starting the development server..." -ForegroundColor Green
    npm run dev
} else {
    Write-Host "Frontend setup failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue..."
}