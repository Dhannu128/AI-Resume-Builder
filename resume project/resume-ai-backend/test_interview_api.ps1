# Test Interview Prep API
Write-Host "Testing Interview Prep API..." -ForegroundColor Green

$body = @{
    resumeContent = "Experienced Software Engineer with 5 years of expertise in Java, Spring Boot, React, and microservices. Strong problem-solving skills and system design experience. Built scalable applications serving millions of users."
    jobDescription = "Senior Software Engineer at Google. Focus on Algorithms, System Design, and Googleyness. Must have strong coding skills and system design experience."
} | ConvertTo-Json

try {
    Write-Host "Sending request to http://localhost:8080/api/v1/interview/prep" -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/interview/prep" -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "`nSUCCESS!" -ForegroundColor Green
    Write-Host "`nSummary:" -ForegroundColor Yellow
    Write-Host $response.summary
    
    Write-Host "`n`nQuestions (Total: $($response.questions.Count)):" -ForegroundColor Yellow
    for ($i = 0; $i -lt $response.questions.Count; $i++) {
        $q = $response.questions[$i]
        Write-Host "`n[$($i+1)] $($q.category) - $($q.difficulty)" -ForegroundColor Cyan
        Write-Host "Q: $($q.question)" -ForegroundColor White
        if ($q.hint) {
            Write-Host "Hint: $($q.hint)" -ForegroundColor Gray
        }
    }
    
} catch {
    Write-Host "`nERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`nResponse:" -ForegroundColor Red
    Write-Host $_.ErrorDetails.Message
}
