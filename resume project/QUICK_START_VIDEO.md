# 🎬 Quick Start Video Script - AI Resume Maker

> **Watch this 5-minute guide to get started immediately!**

---

## 🎥 Scene 1: Introduction (30 seconds)

**[Show landing page]**

"Welcome to AI Resume Maker - the fastest way to create professional resumes using AI!"

**What you'll learn:**
- ✅ How to run the application
- ✅ How to generate your first resume
- ✅ How to deploy for free

---

## 🎥 Scene 2: Prerequisites Check (1 minute)

**[Show terminal/command prompt]**

"First, let's make sure you have everything installed:"

### Step 1: Check Java
```powershell
java -version
```
**Expected:** `java version "17"` or higher

### Step 2: Check Node.js
```powershell
node -version
npm -version
```
**Expected:** `v18.x.x` or higher

### Step 3: Get Gemini API Key
- Go to: https://makersuite.google.com/app/apikey
- Sign in with Google
- Click "Create API Key"
- Copy the key

---

## 🎥 Scene 3: Setup (2 minutes)

**[Show VS Code or File Explorer]**

### Step 1: Configure API Key

"Open the backend configuration file:"

```
resume-ai-backend/src/main/resources/application.properties
```

"Find this line:"
```properties
app.ai.gemini.api-key=AIzaSyC1zErPe0iIry3TeZnsjKoHniCgPAs0UuY
```

"Replace with YOUR API key:"
```properties
app.ai.gemini.api-key=YOUR_ACTUAL_API_KEY_HERE
```

"Save the file."

### Step 2: Build Backend

**[Show terminal]**

```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
.\mvnw.cmd clean package -DskipTests
```

"This will take about 20 seconds..."

**[Fast forward animation]**

"✅ BUILD SUCCESS - Perfect!"

---

## 🎥 Scene 4: Running the Application (1 minute)

**[Show terminal - split screen]**

### Terminal 1: Start Backend

```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-ai-backend"
java -jar target\app.jar
```

"Wait for this message:"
```
APPLICATION STARTED - READY FOR REQUESTS
```

"✅ Backend is now running on http://localhost:8080"

### Terminal 2: Start Frontend

**[If Node.js is installed]**

```powershell
cd "d:\personal\Resume Ai maker\resume project\resume-frontend"
npm install
npm run dev
```

"✅ Frontend is now running on http://localhost:5173"

**[Or use the automated script]**

```powershell
cd "d:\personal\Resume Ai maker\resume project"
.\start-project.bat
```

"This starts everything automatically!"

---

## 🎥 Scene 5: Using the Application (2 minutes)

**[Show browser - http://localhost:5173]**

### Step 1: Landing Page

"Beautiful, modern design with gradient backgrounds!"

- Scroll through features
- Show statistics
- Highlight call-to-action buttons

### Step 2: Generate Resume

"Click 'Create Resume Now'"

**[Show Generate Resume page]**

"Enter your professional story:"

```
Example Description:
I am a Software Engineer with 5 years of experience in Java, Spring Boot, 
and React. I have a Bachelor's degree in Computer Science from XYZ University 
with 8.5 GPA. I have worked at Amazon and Google, building scalable 
microservices. I am skilled in AWS, Docker, Kubernetes, and system design. 
I have built projects like an E-commerce platform and a Real-time analytics 
system.
```

"Click 'Generate Resume with AI'"

**[Show loading animation - 5-10 seconds]**

"AI is working its magic..."

**[Show generated resume]**

"✨ Tada! Your professional resume is ready!"

### Step 3: Download/Print

"Click 'Download PDF' to save your resume"

**[Show print dialog]**

"Save as PDF or print directly!"

---

## 🎥 Scene 6: Deployment (2 minutes)

**[Show Railway and Vercel websites]**

### Deploy Backend to Railway (Free)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd resume-ai-backend
railway init
railway up
```

"Set environment variable:"
```
GEMINI_API_KEY=your_api_key_here
```

"✅ Backend is now live at: https://your-app.up.railway.app"

### Deploy Frontend to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd resume-frontend
vercel --prod
```

"✅ Frontend is now live at: https://your-app.vercel.app"

### Update CORS

"Edit application.properties:"
```properties
app.cors.allowed-origins=https://your-app.vercel.app
```

"Rebuild and redeploy backend."

"✅ Your app is now live and accessible worldwide!"

---

## 🎥 Scene 7: Features Showcase (1 minute)

**[Quick montage of features]**

### Highlights:
- ✨ AI-powered content generation
- 🎨 Beautiful, modern UI
- 📱 Mobile responsive
- ⚡ Fast (< 10 seconds)
- 📄 ATS-optimized format
- 🔒 Privacy-first (no data storage)
- 🌍 Works for any industry

---

## 🎥 Scene 8: Pro Tips (30 seconds)

**[Show quick tips overlay]**

### For Best Results:
1. ✅ Include specific numbers and metrics
2. ✅ Mention education with grades
3. ✅ List work experience with achievements
4. ✅ Detail technical skills
5. ✅ Add notable projects
6. ✅ Include certifications
7. ✅ Be specific and detailed (200-300 words)

---

## 🎥 Scene 9: Troubleshooting (1 minute)

**[Show common issues and solutions]**

### Issue 1: Backend won't start
**Solution:** Check if port 8080 is in use
```powershell
netstat -ano | findstr :8080
```

### Issue 2: Frontend can't connect
**Solution:** Verify backend is running
```powershell
curl http://localhost:8080/actuator/health
```

### Issue 3: Resume generation fails
**Solution:** Check API key is valid
- Test at https://makersuite.google.com/app/apikey
- Generate new key if needed

---

## 🎥 Scene 10: Closing (30 seconds)

**[Show final resume and success screen]**

"🎉 Congratulations! You now have a professional AI Resume Maker!"

### Resources:
- 📚 COMPLETE_SETUP_GUIDE.md - Detailed setup
- 🚀 DEPLOYMENT_GUIDE.md - Production deployment
- 📖 API_DOCUMENTATION.md - API reference
- ✅ PROJECT_COMPLETE.md - Full summary

### Next Steps:
1. Generate your own resume
2. Share with friends
3. Deploy to production
4. Collect feedback
5. Add custom features

"Happy resume building! 🚀"

**[Show app URL and GitHub repo]**

---

## 📝 Quick Reference Card

### Start Application
```powershell
# Option 1: Automatic
.\start-project.bat

# Option 2: Manual
# Terminal 1:
cd resume-ai-backend
java -jar target\app.jar

# Terminal 2:
cd resume-frontend
npm run dev
```

### URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Health: http://localhost:8080/actuator/health

### Test API
```powershell
.\test-api.ps1
```

---

## 🎬 Scene-by-Scene Checklist

For creating an actual video tutorial:

- [ ] Scene 1: Record landing page walkthrough
- [ ] Scene 2: Screen record prerequisite checks
- [ ] Scene 3: Show configuration and build process
- [ ] Scene 4: Demonstrate starting both servers
- [ ] Scene 5: Full resume generation demo
- [ ] Scene 6: Deployment walkthrough
- [ ] Scene 7: Feature highlights montage
- [ ] Scene 8: Tips overlay
- [ ] Scene 9: Troubleshooting guide
- [ ] Scene 10: Call-to-action and resources

---

**Total Video Length:** ~10 minutes  
**Target Audience:** Developers and end-users  
**Difficulty Level:** Beginner-friendly  
**Platform:** YouTube, GitHub, Documentation

---

*This script can be used to create a video tutorial or followed as a step-by-step guide*
