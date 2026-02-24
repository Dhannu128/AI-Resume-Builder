$body = @{
    userDescription = "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on microservices and REST APIs. I have a Bachelor's degree in Computer Science."
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume' -Method POST -Body $body -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Response:"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
