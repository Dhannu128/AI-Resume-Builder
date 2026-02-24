$apiKey = "AIzaSyDj5T63wuzH3FDxdchuguFi6YtZIIPNY34"
$model = "gemini-2.0-flash-001"

$prompt = @"
Generate a resume in JSON format for this person:

USER: "Senior React Developer with 5 years in TypeScript, Next.js, and Redux. Built 10+ enterprise web applications. Expert in AWS cloud deployment."

Return JSON with personalInformation, summary, and skills array. Skills MUST include React, TypeScript, Next.js from the user description above.
"@

$requestBody = @{
    contents = @(
        @{
            parts = @(
                @{ text = $prompt }
            )
        }
    )
    generationConfig = @{
        temperature = 0.7
        maxOutputTokens = 2000
    }
} | ConvertTo-Json -Depth 10

Write-Output "Calling Gemini API directly...`n"

$response = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models/$($model):generateContent?key=$apiKey" -Method POST -Body $requestBody -ContentType "application/json"

Write-Output "========== AI RESPONSE ==========`n"
Write-Output $response.candidates[0].content.parts[0].text
