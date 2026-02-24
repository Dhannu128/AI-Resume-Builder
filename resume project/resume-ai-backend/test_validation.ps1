# Test 1: Valid input
Write-Host "=== Test 1: Valid Input ==="
$validBody = @{
    userDescription = "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on microservices and REST APIs."
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $validBody -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Valid input test: PASSED"
} catch {
    Write-Host "Valid input test: FAILED - $($_.Exception.Message)"
}

Write-Host ""

# Test 2: Empty input
Write-Host "=== Test 2: Empty Input ==="
$emptyBody = @{
    userDescription = ""
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $emptyBody -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Empty input test: FAILED - Should have returned error"
} catch {
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Empty input test: PASSED - Correctly rejected empty input"
}

Write-Host ""

# Test 3: Too short input
Write-Host "=== Test 3: Too Short Input ==="
$shortBody = @{
    userDescription = "Short"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $shortBody -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Short input test: FAILED - Should have returned error"
} catch {
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Short input test: PASSED - Correctly rejected short input"
}

Write-Host ""

# Test 4: Invalid JSON
Write-Host "=== Test 4: Invalid JSON ==="
$invalidJson = "{ invalid json }"

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $invalidJson -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Invalid JSON test: FAILED - Should have returned error"
} catch {
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Invalid JSON test: PASSED - Correctly rejected invalid JSON"
}
