# Resume AI Maker - Setup Guide

## 🚀 Quick Start

### Prerequisites
1. **Java 17** - Required for Spring Boot backend
2. **Node.js & NPM** - Required for React frontend
3. **Together.AI API Key** - Required for AI resume generation

### Step 1: Install Dependencies

```bash
# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# Install Node.js and NPM
sudo apt install nodejs npm

# Verify installations
java -version
node --version
npm --version
```

### Step 2: Get Together.AI API Key

1. Go to [Together.AI](https://api.together.xyz/)
2. Sign up for an account
3. Get your API key from the dashboard
4. Copy the API key for the next step

### Step 3: Configure Backend

1. Edit the backend environment file:
```bash
nano resume-ai-backend/.env
```

2. Replace `your_gemini_api_key_here` with your actual API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 4: Start the Application

#### Option A: Automatic Setup
```bash
# Run the setup script
./start-project.sh
```

#### Option B: Manual Setup

**Terminal 1 - Start Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Start Frontend:**
```bash
./start-frontend.sh
```

### Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

## 🔧 Troubleshooting

### Common Issues

1. **"Java not found"**
   - Install Java 17: `sudo apt install openjdk-17-jdk`

2. **"Node not found"**
   - Install Node.js: `sudo apt install nodejs npm`

3. **"Network Error" in frontend**
   - Ensure backend is running on port 8080
   - Check if Together.AI API key is set correctly

4. **"CORS Error"**
   - Backend is configured for localhost:5173 (Vite default)
   - If using different port, update CORS in application.properties

### API Key Issues

If you get AI-related errors:
1. Verify your Gemini API key is correct
2. Check your Google Cloud account has proper access
3. Ensure the API key has proper permissions

## 📁 Project Structure

```
resume project/
├── resume-ai-backend/     # Spring Boot backend
├── resume-frontend/       # React frontend
├── start-project.sh       # Setup script
├── start-backend.sh       # Backend startup
├── start-frontend.sh      # Frontend startup
└── SETUP_GUIDE.md        # This file
```

## 🎯 Testing

1. Start both backend and frontend
2. Go to http://localhost:5173
3. Enter a professional description
4. Click "Generate Resume"
5. Verify resume is generated successfully

## 🆘 Need Help?

If you encounter issues:
1. Check the console logs in both terminals
2. Verify all prerequisites are installed
3. Ensure API key is set correctly
4. Check network connectivity
