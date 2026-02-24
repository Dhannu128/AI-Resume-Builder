Write-Host "Testing API..." -ForegroundColor Green

$json = '{"resumeContent":"Experienced Software Engineer with Java and React","jobDescription":"Software Engineer at Google"}'

curl.exe -X POST http://localhost:8080/api/v1/interview/prep -H "Content-Type: application/json" -d $json
