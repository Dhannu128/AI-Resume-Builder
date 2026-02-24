$body = @{
    resumeContent = "John Doe - Software Engineer with 3 years of experience in Java and Spring Boot. Worked on microservices and REST APIs. Bachelor's degree in Computer Science."
    jobDescription = "Looking for a Senior Java Developer with Spring Boot experience to work on microservices architecture"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/v1/resume/prepare-interview' -Method POST -Body $body -ContentType 'application/json' -TimeoutSec 30
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Response:"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
