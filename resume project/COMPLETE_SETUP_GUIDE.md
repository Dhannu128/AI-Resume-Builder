# 🚀 Complete Setup Guide - AI Resume Maker

Welcome! This guide will help you set up and run the AI Resume Maker project on your system.

## 📋 Table of Contents
- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
   - Verify installation: Open PowerShell/CMD and run `java -version`

2. **Node.js 18 or higher** (includes npm)
   - Download: [Node.js Official](https://nodejs.org/)
   - Recommended: LTS version
   - Verify installation: `node -version` and `npm -version`

3. **Google Gemini API Key** (Free)
   - Get from: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Create new API key
   - Copy and save it securely

### Optional Tools

- **Git** - For version control
- **VS Code** - Recommended IDE
- **Postman** - For API testing

---

## Installation Steps

### Step 1: Verify Prerequisites

Open PowerShell or Command Prompt and run:

```powershell
# Check Java
java -version
# Should show: java version "17.x.x" or higher

# Check Maven (included with project)
cd "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
.\mvnw.cmd --version
# Should show Maven version

# Check Node.js
node -version
# Should show: v18.x.x or higher

# Check npm
npm -version
# Should show: 9.x.x or higher
```

If any command fails, install the required software first.

### Step 2: Configure Backend

1. **Navigate to backend directory:**
   ```powershell
   cd "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
   ```

2. **Update API Key in `application.properties`:**
   ```powershell
   notepad src\main\resources\application.properties
   ```

3. **Replace the API key:**
   ```properties
   # Find this line:
   app.ai.gemini.api-key=AIzaSyC1zErPe0iIry3TeZnsjKoHniCgPAs0UuY
   
   # Replace with your actual Gemini API key:
   app.ai.gemini.api-key=YOUR_ACTUAL_API_KEY_HERE
   ```

4. **Save and close** the file.

### Step 3: Build Backend

```powershell
# Still in resume-ai-backend directory
.\mvnw.cmd clean package -DskipTests
```

This will:
- Download all dependencies
- Compile the Java code
- Create executable JAR file in `target/app.jar`

**Expected output:** `BUILD SUCCESS`

### Step 4: Install Frontend Dependencies

```powershell
# Navigate to frontend
cd "d:\personal\Resume Ai maker\resume project\resume-frontend"

# Install dependencies
npm install
```

This will:
- Download all npm packages
- Create `node_modules` folder
- Set up the development environment

**Expected output:** Dependencies installed successfully (may take 2-5 minutes)

---

## Running the Application

### Method 1: Using Provided Scripts (Easiest)

#### Windows:

**Option A: Start Everything Together**
```powershell
cd "d:\personal\Resume Ai maker\resume project"
.\start-project.bat
```

**Option B: Start Services Separately**

*Terminal 1 - Backend:*
```powershell
cd "d:\personal\Resume Ai maker\resume project"
.\start-backend.bat
```

*Terminal 2 - Frontend:*
```powershell
cd "d:\personal\Resume Ai maker\resume project"
.\start-frontend.bat
```

#### Linux/Mac:

```bash
cd /path/to/resume-project
chmod +x start-project.sh
./start-project.sh
```

### Method 2: Manual Start

#### Start Backend:

```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
java -jar target\app.jar
```

**Expected output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.3.6)

...
APPLICATION STARTED - READY FOR REQUESTS
```

**Backend will be running on:** `http://localhost:8080`

#### Start Frontend:

Open a **NEW** PowerShell window:

```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-frontend"
npm run dev
```

**Expected output:**
```
VITE v6.3.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Frontend will be running on:** `http://localhost:5173`

---

## Testing the Application

### 1. Verify Backend is Running

**Method A: Browser**
- Open: `http://localhost:8080/actuator/health`
- Should show: `{"status":"UP"}`

**Method B: PowerShell**
```powershell
curl http://localhost:8080/actuator/health
```

### 2. Open the Application

1. Open your web browser
2. Navigate to: `http://localhost:5173`
3. You should see the landing page with gradient background

### 3. Generate a Test Resume

1. Click **"Create Resume Now"** or navigate to **"Generate Resume"**
2. Enter test description:
   ```
   I am Dhannu, pursuing B.Tech from IIIT Allahabad in IT Business branch with 9+ CGPA. I have completed internships at Amazon and Flipkart in backend development. I am skilled in Java, Spring Boot, React, Python, AWS, Docker. I have built projects like Resume AI Maker and E-commerce platform.
   ```
3. Click **"Generate Resume with AI"**
4. Wait 5-10 seconds
5. Your professional resume should appear!

### 4. Test Download Functionality

1. Once resume is generated
2. Click **"Download PDF"** button
3. Print dialog will appear
4. Save as PDF or print

---

## Troubleshooting

### Issue: "npm is not recognized"

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart PowerShell/CMD
3. Verify: `npm -version`

### Issue: "java is not recognized"

**Solution:**
1. Install Java 17+ from [adoptium.net](https://adoptium.net/)
2. Add to PATH:
   - Search "Environment Variables" in Windows
   - Add `C:\Program Files\Java\jdk-17\bin` to PATH
3. Restart PowerShell
4. Verify: `java -version`

### Issue: Backend fails to start

**Check 1: Port 8080 in use**
```powershell
netstat -ano | findstr :8080
```
If port is in use, kill the process:
```powershell
taskkill /PID <PID_NUMBER> /F
```

**Check 2: API Key is valid**
- Go to application.properties
- Ensure API key is correct
- Generate new key at [Google AI Studio](https://makersuite.google.com/app/apikey)

### Issue: Frontend can't connect to backend

**Solution:**
1. Verify backend is running: `http://localhost:8080/actuator/health`
2. Check CORS configuration in `application.properties`:
   ```properties
   app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
   ```
3. Restart both services

### Issue: Resume generation returns error

**Check 1: Gemini API Key**
- Test API key directly:
```powershell
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY" -H "Content-Type: application/json" -d "{\"contents\":[{\"parts\":[{\"text\":\"Hello\"}]}]}"
```

**Check 2: Backend Logs**
- Look at the PowerShell window running backend
- Search for errors related to "Gemini" or "AI"

**Check 3: Network Connection**
- Ensure you have internet connection
- Check firewall isn't blocking the request

### Issue: Styling looks broken

**Solution:**
```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-frontend"
npm install
npm run dev
```

---

## Development Mode vs Production

### Development (Current Setup)
- **Backend:** `http://localhost:8080`
- **Frontend:** `http://localhost:5173`
- **Hot Reload:** Changes reflect immediately
- **Debug:** Full error messages

### Production (See DEPLOYMENT_GUIDE.md)
- Optimized builds
- Deployed to cloud platforms
- Custom domains
- HTTPS enabled

---

## Quick Command Reference

### Backend Commands
```powershell
# Build
.\mvnw.cmd clean package -DskipTests

# Run
java -jar target\app.jar

# Check health
curl http://localhost:8080/actuator/health

# View logs
# (shown in terminal where backend is running)
```

### Frontend Commands
```powershell
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Next Steps

1. ✅ **Test the application** - Generate a few resumes
2. 📝 **Customize** - Modify UI colors, text, features
3. 🚀 **Deploy** - Follow DEPLOYMENT_GUIDE.md
4. 📊 **Monitor** - Check logs and performance
5. 🔄 **Iterate** - Gather feedback and improve

---

## Getting Help

### Documentation
- **README.md** - Project overview
- **DEPLOYMENT_GUIDE.md** - Deploy to production
- **API_DOCUMENTATION.md** - API endpoints (in backend folder)

### Support
- Check the troubleshooting section above
- Review backend logs for errors
- Test individual components
- Verify all prerequisites are installed

---

## Success Indicators

✅ **Backend Started Successfully:**
```
APPLICATION STARTED - READY FOR REQUESTS
```

✅ **Frontend Running:**
```
Local:   http://localhost:5173/
```

✅ **API Working:**
- Health check returns `{"status":"UP"}`
- Resume generation completes in 5-10 seconds
- Resume displays with proper formatting

---

## Project Structure

```
resume-project/
├── resume-ai-backend/           # Spring Boot Backend
│   ├── src/main/java/           # Java source code
│   ├── src/main/resources/      # Configuration files
│   ├── target/                  # Build output
│   │   └── app.jar             # Executable JAR
│   └── pom.xml                  # Maven dependencies
│
├── resume-frontend/             # React Frontend
│   ├── src/                     # React source code
│   │   ├── components/          # Reusable components
│   │   ├── pages/              # Page components
│   │   └── main.jsx            # Entry point
│   ├── public/                  # Static assets
│   ├── package.json            # npm dependencies
│   └── vite.config.js          # Vite configuration
│
├── start-project.bat           # Windows startup script
├── start-backend.bat           # Backend only
├── start-frontend.bat          # Frontend only
├── README.md                   # Project documentation
├── DEPLOYMENT_GUIDE.md         # Deployment instructions
└── SETUP_GUIDE.md             # This file
```

---

**Congratulations!** 🎉 You're now ready to use AI Resume Maker!

---

*Made with ❤️ using React, Spring Boot, and Google Gemini AI*
