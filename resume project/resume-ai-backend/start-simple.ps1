Write-Host "Starting Resume AI Backend..." -ForegroundColor Green
Write-Host "Working Directory: $PWD" -ForegroundColor Yellow
Write-Host "API Key configured: AIzaSyCJXUB3NzG59Nk6V1OffN7q8Jl5mTeGw_I" -ForegroundColor Cyan

try {
    java -jar .\target\app.jar 2>&1 | Tee-Object -FilePath "startup.log"
} catch {
    Write-Host "Error starting backend: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
