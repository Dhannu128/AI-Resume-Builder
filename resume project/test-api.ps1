# =========================================
# AI Resume Maker - API Testing Script
# =========================================
# This script tests all backend API endpoints

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  AI Resume Maker - API Tester" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$BACKEND_URL = "http://localhost:8080"
$testsPassed = 0
$testsFailed = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$URL,
        [string]$Method = "GET",
        [string]$Body = $null
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "URL: $URL" -ForegroundColor Gray
    
    try {
        if ($Method -eq "POST" -and $Body) {
            $response = Invoke-WebRequest -Uri $URL -Method POST -Body $Body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Uri $URL -Method $Method -UseBasicParsing -ErrorAction Stop
        }
        
        Write-Host "✓ PASSED - Status: $($response.StatusCode)" -ForegroundColor Green
        $script:testsPassed++
        Write-Host ""
        return $true
    }
    catch {
        Write-Host "✗ FAILED - Error: $($_.Exception.Message)" -ForegroundColor Red
        $script:testsFailed++
        Write-Host ""
        return $false
    }
}

# Test 1: Health Check
Write-Host "[1/4] Health Check Endpoint" -ForegroundColor Cyan
Test-Endpoint -Name "Health Check" -URL "$BACKEND_URL/actuator/health"

# Test 2: Health with Details
Write-Host "[2/4] Health Details Endpoint" -ForegroundColor Cyan
Test-Endpoint -Name "Health Details" -URL "$BACKEND_URL/actuator/health/readiness"

# Test 3: Resume Generation (Simple)
Write-Host "[3/4] Resume Generation - Simple Test" -ForegroundColor Cyan
$simpleBody = @{
    userDescription = "Software Engineer with 5 years experience in Java and Spring Boot"
} | ConvertTo-Json

$resumeResult = Test-Endpoint -Name "Resume Generation" -URL "$BACKEND_URL/api/v1/resume" -Method "POST" -Body $simpleBody

if ($resumeResult) {
    Write-Host "Resume generated successfully!" -ForegroundColor Green
}

# Test 4: Resume Generation (Detailed)
Write-Host "[4/4] Resume Generation - Detailed Test" -ForegroundColor Cyan
$detailedBody = @{
    userDescription = "I am Dhannu, pursuing B.Tech from IIIT Allahabad in IT Business branch with CGPA 9+. I have completed internships at Amazon and Flipkart where I worked on backend development using Java, Spring Boot, and AWS. I am skilled in React, Python, Docker, Kubernetes. I have built multiple projects including a Resume AI Maker and an E-commerce platform. I am passionate about system design and scalable architectures."
} | ConvertTo-Json

Test-Endpoint -Name "Resume Generation (Detailed)" -URL "$BACKEND_URL/api/v1/resume" -Method "POST" -Body $detailedBody

# Summary
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "         Test Summary" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Tests Passed: $testsPassed" -ForegroundColor Green
Write-Host "Tests Failed: $testsFailed" -ForegroundColor Red
Write-Host "Total Tests: $($testsPassed + $testsFailed)" -ForegroundColor Yellow
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "🎉 All tests passed! Your backend is working perfectly!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Some tests failed. Please check:" -ForegroundColor Yellow
    Write-Host "  1. Is the backend running? (java -jar target\app.jar)" -ForegroundColor White
    Write-Host "  2. Is it running on port 8080? (http://localhost:8080)" -ForegroundColor White
    Write-Host "  3. Is the Gemini API key configured correctly?" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
