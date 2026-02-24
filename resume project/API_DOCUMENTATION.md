# 📚 API Documentation - AI Resume Maker

Complete API reference for the AI Resume Maker backend services.

## 🌐 Base URL

**Local Development:**
```
http://localhost:8080
```

**Production:**
```
https://your-backend-domain.com
```

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Resume API](#resume-api)
- [Interview Preparation API](#interview-preparation-api)
- [Health & Monitoring](#health--monitoring)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

Currently, the API does not require authentication. For production deployment, consider implementing:
- API Keys
- OAuth 2.0
- JWT Tokens
- Rate limiting per IP

---

## 📝 Resume API

### Generate Resume

Creates a professional, ATS-optimized resume from user description using Google Gemini AI.

**Endpoint:** `POST /api/v1/resume`

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "userDescription": "string (required, min 50 characters)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8080/api/v1/resume \
  -H "Content-Type: application/json" \
  -d '{
    "userDescription": "I am a Software Engineer with 5 years of experience in Java, Spring Boot, and React. I have a B.Tech in Computer Science from IIT Delhi with 8.5 CGPA. I have worked at Amazon and Google, building scalable microservices. I am skilled in AWS, Docker, Kubernetes, and system design."
  }'
```

**Success Response:**

**Code:** `200 OK`

```json
{
  "status": "success",
  "message": "Resume generated successfully",
  "data": {
    "resume": {
      "personalInformation": {
        "fullName": "John Doe",
        "email": "john.doe@email.com",
        "phoneNumber": "+1-234-567-8900",
        "location": "New York, USA",
        "linkedIn": "linkedin.com/in/johndoe",
        "gitHub": "github.com/johndoe",
        "portfolio": "johndoe.com"
      },
      "summary": "Experienced Software Engineer with 5+ years...",
      "skills": [
        "Java",
        "Spring Boot",
        "React",
        "AWS",
        "Docker"
      ],
      "experience": [
        {
          "jobTitle": "Senior Software Engineer",
          "company": "Amazon",
          "location": "Seattle, WA",
          "duration": "2020 - Present",
          "responsibility": "Led development of microservices..."
        }
      ],
      "education": [
        {
          "degree": "Bachelor of Technology in Computer Science",
          "university": "IIT Delhi",
          "location": "New Delhi, India",
          "graduationYear": "2018",
          "cgpa": "8.5/10"
        }
      ],
      "projects": [
        {
          "title": "E-Commerce Platform",
          "description": "Built a scalable e-commerce platform...",
          "technologiesUsed": ["Java", "Spring Boot", "React"],
          "githubLink": "github.com/johndoe/ecommerce"
        }
      ],
      "certifications": [
        {
          "title": "AWS Solutions Architect",
          "issuingOrganization": "Amazon Web Services",
          "year": "2021"
        }
      ],
      "achievements": [
        {
          "title": "Employee of the Year",
          "year": "2022",
          "extraInformation": "Recognized for exceptional performance"
        }
      ],
      "languages": ["English", "Hindi"],
      "interests": ["Coding", "System Design", "Open Source"]
    }
  }
}
```

**Error Response:**

**Code:** `400 Bad Request`
```json
{
  "status": "error",
  "message": "User description is required and must be at least 50 characters",
  "data": null
}
```

**Code:** `500 Internal Server Error`
```json
{
  "status": "error",
  "message": "Failed to generate resume: API rate limit exceeded",
  "data": null
}
```

---

## 🎤 Interview Preparation API

### Generate Interview Questions

Creates personalized interview preparation material based on resume and job description.

**Endpoint:** `POST /api/v1/resume/prepare-interview`

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "resumeContent": "string (required)",
  "jobDescription": "string (required)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8080/api/v1/resume/prepare-interview \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContent": "Senior Software Engineer with 5 years experience in Java and Spring Boot...",
    "jobDescription": "Looking for a Senior Backend Developer with expertise in microservices and cloud technologies..."
  }'
```

**Success Response:**

**Code:** `200 OK`

```json
{
  "status": "success",
  "message": "Interview preparation completed",
  "data": {
    "interview": {
      "technicalQuestions": [
        {
          "question": "Explain the difference between monolithic and microservices architecture",
          "category": "System Design",
          "difficulty": "Medium",
          "suggestedAnswer": "Microservices architecture breaks down applications into small, independent services..."
        }
      ],
      "behavioralQuestions": [
        {
          "question": "Tell me about a time you faced a challenging bug",
          "category": "Problem Solving",
          "tips": "Use the STAR method: Situation, Task, Action, Result..."
        }
      ],
      "companySpecific": [
        "Research the company's tech stack",
        "Understand their products and services",
        "Prepare questions about team structure"
      ],
      "tips": [
        "Practice coding on whiteboard",
        "Review system design patterns",
        "Prepare behavioral answers"
      ]
    }
  }
}
```

---

## 🏥 Health & Monitoring

### Health Check

Check if the application is running and healthy.

**Endpoint:** `GET /actuator/health`

**Example Request:**
```bash
curl http://localhost:8080/actuator/health
```

**Success Response:**

**Code:** `200 OK`
```json
{
  "status": "UP"
}
```

### Detailed Health Check

Get detailed health information including components.

**Endpoint:** `GET /actuator/health/readiness`

**Example Request:**
```bash
curl http://localhost:8080/actuator/health/readiness
```

**Success Response:**

**Code:** `200 OK`
```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 250685575168,
        "free": 100000000000,
        "threshold": 10485760,
        "exists": true
      }
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format

All error responses follow this standard format:

```json
{
  "status": "error",
  "message": "Descriptive error message",
  "data": null,
  "timestamp": "2025-10-07T12:34:56.789Z",
  "path": "/api/v1/resume"
}
```

### Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid input parameters |
| 404 | Not Found | Endpoint not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | AI service temporarily unavailable |

### Error Examples

#### Validation Error (400)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "userDescription",
      "message": "must not be blank"
    }
  ]
}
```

#### AI Service Error (500)
```json
{
  "status": "error",
  "message": "Gemini AI service call failed: API key invalid",
  "data": null
}
```

---

## 🚦 Rate Limiting

### Current Limits

- **Resume Generation:** 60 requests per minute per IP
- **Interview Prep:** 30 requests per minute per IP
- **Health Checks:** Unlimited

### Rate Limit Headers

Responses include rate limit information:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1633024800
```

### Rate Limit Exceeded Response

**Code:** `429 Too Many Requests`

```json
{
  "status": "error",
  "message": "Rate limit exceeded. Please try again in 60 seconds.",
  "retryAfter": 60
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_api_key_here

# Optional (with defaults)
GEMINI_MODEL=gemini-1.5-flash         # AI model to use
GEMINI_MAX_TOKENS=2000                # Max tokens in response
GEMINI_TEMPERATURE=0.7                # AI creativity (0-1)
PORT=8080                             # Server port
```

### CORS Configuration

Default allowed origins:
```
http://localhost:3000
http://localhost:5173
https://your-frontend-domain.com
```

To update CORS, edit `application.properties`:
```properties
app.cors.allowed-origins=https://new-domain.com
```

---

## 📊 Request/Response Examples

### Minimal User Description

**Request:**
```json
{
  "userDescription": "Software developer with 2 years experience in Python and Django. Computer Science graduate."
}
```

**Response:** Generates basic resume with provided information.

### Detailed User Description

**Request:**
```json
{
  "userDescription": "I am Rahul Kumar, a Senior Software Engineer with 7 years of experience in full-stack development. I have a Master's degree in Computer Science from Stanford University with a GPA of 3.9/4.0. I have worked at Google, Amazon, and Microsoft, leading teams of 5-10 engineers. I specialize in Java, Python, JavaScript, React, Node.js, AWS, and Kubernetes. I have architected and deployed microservices handling millions of requests per day. I hold AWS Solutions Architect and Kubernetes certifications. I have published 3 research papers in machine learning. My notable projects include a real-time analytics platform and a distributed caching system. I speak English, Hindi, and Spanish fluently."
}
```

**Response:** Generates comprehensive resume with all sections filled.

---

## 🧪 Testing the API

### Using cURL

```bash
# Test health
curl http://localhost:8080/actuator/health

# Generate resume
curl -X POST http://localhost:8080/api/v1/resume \
  -H "Content-Type: application/json" \
  -d '{"userDescription":"Your description here"}'

# Pretty print JSON
curl http://localhost:8080/actuator/health | jq '.'
```

### Using PowerShell

```powershell
# Test health
Invoke-RestMethod -Uri "http://localhost:8080/actuator/health"

# Generate resume
$body = @{
    userDescription = "Your description here"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/resume" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Using Postman

1. **Create New Request**
   - Method: POST
   - URL: `http://localhost:8080/api/v1/resume`

2. **Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Body** (raw, JSON)
   ```json
   {
     "userDescription": "Your professional description"
   }
   ```

4. **Send** and view response

---

## 📈 Performance

### Response Times (Average)

- Health Check: < 50ms
- Resume Generation: 5-10 seconds (AI processing)
- Interview Prep: 8-15 seconds (AI processing)

### Optimization Tips

1. **Reduce Description Length** - Shorter descriptions process faster
2. **Cache Results** - Store frequently requested resumes
3. **Batch Requests** - Group multiple requests when possible
4. **Use Mock AI** - For testing, set empty API key for instant responses

---

## 🔒 Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use HTTPS** in production
3. **Implement authentication** for public deployments
4. **Rate limit** to prevent abuse
5. **Validate input** thoroughly
6. **Sanitize output** to prevent XSS
7. **Monitor logs** for suspicious activity

---

## 📞 Support & Debugging

### Enable Debug Logging

Edit `application.properties`:
```properties
logging.level.com.resume.backend=DEBUG
```

### Common Issues

#### Issue: "Gemini AI service call failed"
- **Check:** API key is valid
- **Check:** Internet connection
- **Check:** Gemini API quota

#### Issue: "Connection refused"
- **Check:** Backend is running
- **Check:** Port 8080 is not blocked
- **Check:** Firewall settings

#### Issue: "CORS error"
- **Check:** Frontend domain in allowed origins
- **Check:** CORS configuration in application.properties

---

## 🚀 SDK Examples

### JavaScript/TypeScript

```javascript
// ResumeService.js
const API_BASE_URL = 'http://localhost:8080';

export const generateResume = async (userDescription) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userDescription }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data.resume;
};
```

### Python

```python
import requests

def generate_resume(user_description):
    url = 'http://localhost:8080/api/v1/resume'
    headers = {'Content-Type': 'application/json'}
    data = {'userDescription': user_description}
    
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    
    return response.json()['data']['resume']
```

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Resume generation with Gemini AI
- ✅ Interview preparation endpoint
- ✅ Health monitoring
- ✅ CORS support
- ✅ Error handling

### Planned Features
- 🔜 PDF export endpoint
- 🔜 Resume templates selection
- 🔜 User authentication
- 🔜 Resume storage and retrieval
- 🔜 Analytics and tracking

---

*Last Updated: October 2025*
*API Version: 1.0.0*
*Backend Version: 1.0.0*
