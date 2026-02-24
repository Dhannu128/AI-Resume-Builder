Write-Host "Testing Resume AI Backend API" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n[TEST 1] Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method Get
    Write-Host "✓ Backend is UP" -ForegroundColor Green
    Write-Host "Status: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $_" -ForegroundColor Red
    exit 1
}

# Test 2: Resume Generation
Write-Host "`n[TEST 2] Testing Resume Generation..." -ForegroundColor Yellow
$testDescription = "myself dhannu and I have pursuing my btech degree form iiit allahabad in it business branch and having cgpa 9+ and have internship in amazon,flipkart"

$body = @{
    userDescription = $testDescription
} | ConvertTo-Json

Write-Host "Request Body:" -ForegroundColor Cyan
Write-Host $body -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/resume" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "✓ Resume generated successfully!" -ForegroundColor Green
    Write-Host "`nResponse:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Resume generation failed!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "`nError Response Body:" -ForegroundColor Yellow
        Write-Host $responseBody -ForegroundColor Gray
    }
}
