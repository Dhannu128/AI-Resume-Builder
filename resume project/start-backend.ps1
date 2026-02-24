Write-Host "Starting Resume AI Backend..." -ForegroundColor Green
Set-Location "f:\Resume Ai maker\resume project\resume-ai-backend"

Write-Host "Building the backend..." -ForegroundColor Yellow
mvn clean package -DskipTests

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend built successfully! Starting the application..." -ForegroundColor Green
    java -jar target/app.jar
} else {
    Write-Host "Backend build failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue..."
}