# PowerShell script to test resume generation API
Write-Host "Testing Resume Generation API..." -ForegroundColor Green

# Test data
$testData = @{
    userDescription = "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on microservices and REST APIs. I have a Bachelor's degree in Computer Science."
} | ConvertTo-Json

Write-Host "Request Data:" -ForegroundColor Yellow
Write-Host $testData

try {
    Write-Host "`nTesting Health Endpoint..." -ForegroundColor Cyan
    $healthResponse = Invoke-RestMethod -Uri 'http://localhost:8080/actuator/health' -Method GET -TimeoutSec 10
    Write-Host "Health Status: $($healthResponse.status)" -ForegroundColor Green
    
    Write-Host "`nTesting Resume Generation..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $testData -ContentType 'application/json' -TimeoutSec 30
    
    Write-Host "Response Status: $($response.status)" -ForegroundColor Green
    Write-Host "Response Message: $($response.message)" -ForegroundColor Green
    
    if ($response.status -eq "success") {
        Write-Host "✅ Resume generation successful!" -ForegroundColor Green
        Write-Host "Resume data received with personal info: $($response.data.resume.personalInformation.fullName)" -ForegroundColor Green
    } else {
        Write-Host "❌ Resume generation failed: $($response.message)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host "Error Type: $($_.Exception.GetType().Name)" -ForegroundColor Red
    Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        Write-Host "HTTP Status Description: $($_.Exception.Response.StatusDescription)" -ForegroundColor Red
    }
    
    # Check if it's a connection error
    if ($_.Exception.Message -like "*connection*" -or $_.Exception.Message -like "*network*") {
        Write-Host "`n🔍 This appears to be a network/connection issue." -ForegroundColor Yellow
        Write-Host "Possible causes:" -ForegroundColor Yellow
        Write-Host "1. Backend server is not running on port 8080" -ForegroundColor Yellow
        Write-Host "2. Firewall blocking the connection" -ForegroundColor Yellow
        Write-Host "3. Port 8080 is being used by another application" -ForegroundColor Yellow
    }
}

Write-Host "`nTest completed." -ForegroundColor Green
