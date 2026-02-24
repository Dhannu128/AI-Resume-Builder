# 🤖 AI Resume Maker - Professional Resume Builder

> **Transform Your Career Story into a Professional Resume in 30 Seconds**

[![AI Powered](https://img.shields.io/badge/AI-Powered-blue)](https://ai.google.dev/) 
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/) 
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.6-green)](https://spring.io/projects/spring-boot) 
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)](https://ai.google.dev/) 
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A cutting-edge, AI-powered resume generation application that creates professional, ATS-optimized resumes using Google Gemini AI. Built with modern technologies including React 19, Spring Boot 3.3.6, and Tailwind CSS with DaisyUI.

## 🌟 Key Features

### ✨ Core Features

- 🎯 **AI-Powered Generation** - Google Gemini AI creates tailored, professional content
- ⚡ **Lightning Fast** - Generate complete resumes in under 30 seconds
- 🎨 **Beautiful UI** - Modern, gradient-rich design with smooth animations
- 📱 **Fully Responsive** - Works flawlessly on all devices and screen sizes
- 🤖 **ATS Optimized** - Resumes formatted to pass Applicant Tracking Systems
- 📄 **Instant Download** - Export as PDF with one click
- 🔒 **Privacy First** - No data storage, complete privacy
- 🌐 **Universal** - Works for any industry, role, or location

### 🚀 Advanced Features

- **Interview Preparation** - AI-generated interview questions and tips
- **Smart Formatting** - Professional layouts automatically applied
- **Real-time Preview** - See changes instantly as you type
- **Sample Templates** - Quick start with pre-filled examples
- **Network Diagnostics** - Built-in API testing and troubleshooting
- **Multi-section Support** - Skills, experience, education, projects, certifications, and more
- **Custom Styling** - Tailwind CSS with DaisyUI themes

## � Demo

![AI Resume Maker Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=AI+Resume+Maker+Demo)

### Live Demo (Coming Soon)
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-api.railway.app`

### Screenshots

<details>
<summary>Click to view screenshots</summary>

**Landing Page**
![Landing Page](https://via.placeholder.com/600x400/6366f1/ffffff?text=Landing+Page)

**Resume Generator**
![Resume Generator](https://via.placeholder.com/600x400/ec4899/ffffff?text=Resume+Generator)

**Generated Resume**
![Generated Resume](https://via.placeholder.com/600x400/10b981/ffffff?text=Generated+Resume)

</details>

## �🏗️ Architecture

```
┌─────────────────────┐         HTTP/REST        ┌──────────────────────┐       API Calls      ┌──────────────────┐
│                     │  ────────────────────►   │                      │  ─────────────────►  │                  │
│  React Frontend     │                          │  Spring Boot API     │                      │   Google Gemini  │
│  (Vite + Tailwind)  │  ◄────────────────────   │  (Java 17)           │  ◄─────────────────  │   AI Engine      │
│  Port: 5173         │         JSON             │  Port: 8080          │      AI Response     │                  │
└─────────────────────┘                          └──────────────────────┘                      └──────────────────┘
         │                                                  │
         │                                                  │
         ▼                                                  ▼
  User Interface                                    Business Logic
  - Modern UI/UX                                    - AI Integration
  - DaisyUI Themes                                  - Resume Processing
  - Responsive Design                               - API Management
  - Real-time Updates                               - Error Handling
```

### Tech Stack Overview

**Frontend:**
- ⚛️ React 19 - Latest React features
- ⚡ Vite 6.3.5 - Lightning-fast build tool
- 🎨 Tailwind CSS 3.4 - Utility-first CSS
- 🌸 DaisyUI 5.0 - Beautiful UI components
- 🔄 Axios - HTTP client
- 🎉 React Hot Toast - Notifications
- 🖨️ React-to-Print - PDF generation

**Backend:**
- ☕ Java 17 - Modern Java features
- 🍃 Spring Boot 3.3.6 - Enterprise framework
- 🔄 Spring WebFlux - Reactive programming
- 🛡️ Spring Security - Security layer
- 🤖 Google Gemini AI - AI engine
- 📊 Actuator - Health monitoring
- 🔁 Spring Retry - Resilience

**AI Integration:**
- 🧠 Google Gemini 1.5 Flash
- 📝 Smart prompt engineering
- 🔄 Retry mechanisms
- ⚡ Optimized token usage

## 🛠️ Technology Stack

### Frontend Technologies
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.3",
    "axios": "^1.10.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "lucide-react": "^0.517.0",
    "tailwindcss": "^3.4.17",
    "daisyui": "^5.0.43"
  }
}
```

### Backend Technologies
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

## 🚀 Quick Start

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **Google Gemini API Key** (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### 1. Clone the Repository
```bash
git clone <repository-url>
cd resume-ai-maker
```

### 2. Set Up Environment Variables
```bash
# Backend configuration
cd resume-ai-backend
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Start the Application
```bash
# Option 1: Start everything at once
./start-project.sh

# Option 2: Start services individually
./start-backend.sh    # Terminal 1
./start-frontend.sh   # Terminal 2
```

### 4. Access the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

## 📖 Usage

1. **Open the application** in your browser
2. **Enter your professional details** in the text area
3. **Click "Generate Resume with AI"**
4. **Review and customize** the generated resume
5. **Download** in your preferred format

### Example Input
```
I am a software engineer with 5 years of experience in Java, Spring Boot, 
and React. I have worked at tech companies building scalable web applications 
and microservices. I have a Bachelor's degree in Computer Science and am 
passionate about clean code and agile development.
```

## 🔧 Configuration

### Backend Environment Variables
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional (with defaults)
GEMINI_MODEL=gemini-1.5-flash
GEMINI_MAX_TOKENS=2000
GEMINI_TEMPERATURE=0.7
PORT=8080
```

### Frontend Configuration
The frontend automatically connects to the backend on `localhost:8080`. For production deployments, update the API base URL in the frontend configuration.

## 📚 API Documentation

### Generate Resume
```http
POST /api/v1/resume
Content-Type: application/json

{
  "userDescription": "Your professional background description"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Resume generated successfully",
  "data": {
    "resume": {
      "personalInformation": { ... },
      "summary": "...",
      "skills": [...],
      "experience": [...],
      "education": [...],
      "projects": [...]
    }
  }
}
```

For detailed API documentation, see [resume-ai-backend/API_DOCUMENTATION.md](resume-ai-backend/API_DOCUMENTATION.md).

## 🧪 Testing

### Backend Tests
```bash
cd resume-ai-backend
./mvnw test
```

### Frontend Tests
```bash
cd resume-frontend
npm test
```

### Manual API Testing
```bash
# Test resume generation
curl -X POST http://localhost:8080/api/v1/resume \
  -H "Content-Type: application/json" \
  -d '{"userDescription":"I am a software engineer"}'

# Test health endpoint
curl http://localhost:8080/actuator/health
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. **Build the backend**:
   ```bash
   cd resume-ai-backend
   ./mvnw clean package
   java -jar target/resume-ai-backend-1.0.0.jar
   ```

2. **Build the frontend**:
   ```bash
   cd resume-frontend
   npm run build
   # Serve the dist/ folder with your web server
   ```

## 🔍 Troubleshooting

### Common Issues

1. **"Gemini AI service call failed"**
   - Check your API key is correct
   - Verify your Google Cloud account has access to Gemini API
   - Ensure you have sufficient quota

2. **"Connection refused"**
   - Make sure the backend is running on port 8080
   - Check firewall settings
   - Verify environment variables are loaded

3. **Frontend can't connect to backend**
   - Ensure CORS is properly configured
   - Check the API base URL in frontend configuration
   - Verify both services are running

### Network Diagnostics
The application includes built-in network diagnostics accessible from the frontend UI to help troubleshoot connectivity issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model capabilities
- **Spring Boot** for the robust backend framework
- **React** for the modern frontend framework
- **Tailwind CSS** for beautiful styling

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ and AI**
