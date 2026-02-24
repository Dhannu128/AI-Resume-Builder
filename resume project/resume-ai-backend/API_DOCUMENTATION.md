# Resume AI Builder Backend API Documentation

## Overview
The Resume AI Builder Backend provides REST APIs for generating professional resumes and interview preparation materials using AI technology.

## Base URL
- Development: `http://localhost:8080`
- Production: `https://your-domain.com`

## Authentication
Currently, no authentication is required. Rate limiting is applied (10 requests per minute per IP).

## API Endpoints

### 1. Generate Resume

**Endpoint:** `POST /api/v1/resume`

**Description:** Generates a professional resume based on user description.

**Request Body:**
```json
{
  "userDescription": "I am a software engineer with 3 years of experience in Java and Spring Boot. I have worked on microservices and REST APIs. I have a Bachelor's degree in Computer Science."
}
```

**Validation Rules:**
- `userDescription`: Required, 10-5000 characters

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Resume generated successfully",
  "data": {
    "resume": {
      "personalInformation": {
        "fullName": "John Doe",
        "email": "john.doe@email.com",
        "phoneNumber": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedIn": "https://linkedin.com/in/johndoe",
        "gitHub": "https://github.com/johndoe",
        "portfolio": "https://johndoe.dev"
      },
      "summary": "Experienced software engineer with 3+ years in Java and Spring Boot development...",
      "skills": [
        {"title": "Java", "level": "Expert"},
        {"title": "Spring Boot", "level": "Advanced"}
      ],
      "experience": [...],
      "education": [...],
      "certifications": [...],
      "projects": [...],
      "achievements": [...],
      "languages": [...],
      "interests": [...]
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input validation
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### 2. Prepare Interview

**Endpoint:** `POST /api/v1/resume/prepare-interview`

**Description:** Generates interview questions based on resume content and job description.

**Request Body:**
```json
{
  "resumeContent": "John Doe - Software Engineer with Java and Spring Boot experience...",
  "jobDescription": "Looking for a Senior Java Developer with microservices experience..."
}
```

**Validation Rules:**
- `resumeContent`: Required, 10-10000 characters
- `jobDescription`: Optional, max 5000 characters

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Interview preparation completed",
  "data": {
    "interview": {
      "summary": "Strong technical background in Java and Spring Boot. Focus on system design and leadership experience.",
      "questions": [
        {
          "question": "Explain the difference between @Component, @Service, and @Repository annotations in Spring",
          "category": "Technical",
          "difficulty": "Medium",
          "hint": "Focus on the semantic meaning and any special behaviors each annotation provides"
        },
        {
          "question": "Describe a challenging technical problem you solved in your previous role",
          "category": "Behavioral",
          "difficulty": "Medium",
          "hint": "Use the STAR method: Situation, Task, Action, Result"
        }
      ]
    }
  }
}
```

### 3. Health Check

**Endpoint:** `GET /actuator/health`

**Description:** Application health status.

**Success Response (200):**
```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {...}
    }
  }
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Error description",
  "data": null
}
```

### Common Error Codes:
- `400`: Bad Request - Invalid input
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

## Rate Limiting
- **Limit:** 10 requests per minute per IP address
- **Scope:** All `/api/v1/resume/**` endpoints
- **Reset:** Every minute

## Security Features
- Input sanitization and validation
- XSS protection
- SQL injection prevention
- Rate limiting
- Request/response logging

## Usage Examples

### cURL Examples

**Generate Resume:**
```bash
curl -X POST http://localhost:8080/api/v1/resume \
  -H "Content-Type: application/json" \
  -d '{
    "userDescription": "Software engineer with 3 years Java experience"
  }'
```

**Prepare Interview:**
```bash
curl -X POST http://localhost:8080/api/v1/resume/prepare-interview \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContent": "John Doe - Java Developer...",
    "jobDescription": "Senior Java Developer position..."
  }'
```

### JavaScript/Fetch Examples

```javascript
// Generate Resume
const response = await fetch('/api/v1/resume', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userDescription: 'Software engineer with 3 years Java experience'
  })
});

const result = await response.json();
if (result.status === 'success') {
  console.log('Resume generated:', result.data.resume);
}
```

## Environment Variables

### Required for Production:
- `GEMINI_API_KEY`: Google Gemini API key for AI functionality
- `SPRING_DATASOURCE_URL`: Database URL (if using database)
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password

### Optional:
- `GEMINI_MODEL`: AI model to use (default: gemini-1.5-flash)
- `GEMINI_MAX_TOKENS`: Max tokens per request (default: 2000)
- `GEMINI_TEMPERATURE`: AI temperature (default: 0.7)
- `SERVER_PORT`: Server port (default: 8080)

## Deployment Notes

1. **AI API Key**: Set `GEMINI_API_KEY` environment variable for production AI responses
2. **CORS**: Configure allowed origins in `application.properties`
3. **Logging**: Logs are written to console and can be redirected to files
4. **Health Checks**: Use `/actuator/health` for monitoring
5. **Rate Limiting**: Adjust limits in `RateLimitingConfig.java` as needed

## Support

For issues or questions, please check the application logs and ensure all environment variables are properly configured.
