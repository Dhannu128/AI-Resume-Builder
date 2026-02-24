# 🚀 Deployment Guide - AI Resume Maker

Complete guide to deploy your AI Resume Maker application to production.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Configuration](#environment-configuration)
- [Platform-Specific Guides](#platform-specific-guides)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ **Google Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. ✅ **Git** installed on your system
3. ✅ **Backend built successfully** - `mvn clean package -DskipTests`
4. ✅ **Frontend built successfully** - `npm run build`

---

## Backend Deployment

### Option 1: Deploy to Railway (Recommended)

**Railway** is free and simple for Java Spring Boot applications.

#### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize in backend directory
   cd resume-ai-backend
   railway init
   ```

3. **Configure Environment Variables**
   In Railway dashboard:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   PORT=8080
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Get Your Backend URL**
   - Example: `https://resume-ai-backend-production.up.railway.app`

### Option 2: Deploy to Render

1. **Create Render Account** at [render.com](https://render.com)

2. **New Web Service**
   - Connect your GitHub repository
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/app.jar`

3. **Environment Variables**
   ```
   GEMINI_API_KEY=your_api_key
   PORT=8080
   ```

### Option 3: Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd resume-ai-backend
heroku create your-resume-api

# Set environment variables
heroku config:set GEMINI_API_KEY=your_api_key

# Deploy
git push heroku main
```

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

```bash
# SSH into your server
ssh user@your-server-ip

# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# Upload your JAR file
scp target/app.jar user@your-server-ip:/home/user/

# Create systemd service
sudo nano /etc/systemd/system/resume-api.service
```

**Service file content:**
```ini
[Unit]
Description=Resume AI Backend
After=network.target

[Service]
User=user
WorkingDirectory=/home/user
ExecStart=/usr/bin/java -jar /home/user/app.jar
Environment="GEMINI_API_KEY=your_api_key"
Environment="PORT=8080"
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Start service
sudo systemctl enable resume-api
sudo systemctl start resume-api
sudo systemctl status resume-api
```

---

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended - Free)

**Vercel** is perfect for React applications and offers automatic deployments.

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build Frontend**
   ```bash
   cd resume-frontend
   npm run build
   ```

3. **Update API URL**
   Create `resume-frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

4. **Update ResumeService.js**
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
   ```

5. **Deploy**
   ```bash
   vercel
   # Follow prompts
   ```

6. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   cd resume-frontend
   npm run build
   netlify deploy --prod
   ```

3. **Environment Variables in Netlify**
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_URL=your_backend_url`

### Option 3: Deploy to GitHub Pages

```bash
cd resume-frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Traditional Hosting (Nginx)

```bash
# Build
npm run build

# Upload dist folder to server
scp -r dist/* user@server:/var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Configuration

### Backend Environment Variables

```bash
# Required
GEMINI_API_KEY=AIzaSyC1zErPe0iIry3TeZnsjKoHniCgPAs0UuY  # Replace with your key

# Optional (with defaults)
GEMINI_MODEL=gemini-1.5-flash
GEMINI_MAX_TOKENS=2000
GEMINI_TEMPERATURE=0.7
PORT=8080
```

### Frontend Environment Variables

Create `.env.production` in `resume-frontend/`:

```bash
VITE_API_URL=https://your-backend-domain.com
```

---

## Platform-Specific Guides

### Complete Vercel + Railway Deployment

This is the **recommended FREE setup**:

#### 1. Deploy Backend to Railway

```bash
# Navigate to backend
cd resume-ai-backend

# Build
./mvnw clean package -DskipTests

# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### 2. Get Backend URL
- Go to Railway dashboard
- Find your service URL (e.g., `https://resume-backend-production.up.railway.app`)

#### 3. Update Frontend Configuration

Edit `resume-frontend/src/api/ResumeService.js` or create environment file:

```javascript
const API_BASE_URL = 'https://your-railway-backend-url.com';
```

#### 4. Deploy Frontend to Vercel

```bash
# Navigate to frontend
cd resume-frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

#### 5. Update CORS in Backend

Edit `resume-ai-backend/src/main/resources/application.properties`:

```properties
app.cors.allowed-origins=https://your-vercel-domain.vercel.app,http://localhost:3000,http://localhost:5173
```

Rebuild and redeploy backend.

---

## Post-Deployment Checklist

### ✅ Backend Verification

1. **Health Check**
   ```bash
   curl https://your-backend-url/actuator/health
   ```
   Should return: `{"status":"UP"}`

2. **Resume API Test**
   ```bash
   curl -X POST https://your-backend-url/api/v1/resume \
     -H "Content-Type: application/json" \
     -d '{"userDescription":"Test user"}'
   ```

### ✅ Frontend Verification

1. **Open your frontend URL**
2. **Test Resume Generation**
   - Enter sample description
   - Click "Generate Resume"
   - Verify resume is displayed
   - Test download/print functionality

### ✅ CORS Configuration

If you get CORS errors:

1. **Check backend CORS settings**
   ```properties
   app.cors.allowed-origins=https://your-frontend-domain.com
   ```

2. **Verify backend is receiving requests**
   - Check backend logs
   - Look for OPTIONS preflight requests

### ✅ API Key Verification

If resume generation fails:

1. **Verify API key is set**
   ```bash
   # On Railway/Render
   railway variables
   ```

2. **Test API key directly**
   ```bash
   curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

---

## Custom Domain Setup

### For Vercel (Frontend)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `www.yourresume.com`
3. Update DNS records as instructed

### For Railway (Backend)

1. Go to Railway Dashboard → Your Service → Settings
2. Click "Generate Domain" or add custom domain
3. Update DNS: `CNAME api.yourresume.com → your-app.up.railway.app`

---

## Monitoring & Logs

### Backend Logs

**Railway:**
```bash
railway logs
```

**Render:**
- Go to Dashboard → Logs tab

**Heroku:**
```bash
heroku logs --tail
```

### Frontend Logs

**Vercel:**
```bash
vercel logs
```

Or check Vercel Dashboard → Deployments → Click deployment → View Logs

---

## Troubleshooting

### Common Issues

#### 1. **CORS Error**
**Solution:** Add your frontend domain to backend CORS configuration

#### 2. **API Connection Failed**
**Solution:** 
- Verify backend URL in frontend code
- Check backend is running
- Test backend health endpoint

#### 3. **Resume Generation Returns 500 Error**
**Solution:**
- Check Gemini API key is valid
- Verify API key has correct permissions
- Check backend logs for detailed error

#### 4. **Build Fails**
**Solution:**
- Run `mvn clean package -DskipTests` for backend
- Run `npm run build` for frontend
- Check for compilation errors

---

## Cost Optimization

### Free Tier Limits

**Railway:**
- $5 free credit monthly
- Sleep after 5 minutes of inactivity (Pro feature prevents this)

**Vercel:**
- 100 GB bandwidth/month
- Unlimited projects

**Gemini API:**
- 60 requests/minute (Free tier)
- Rate limits may apply

### Recommendations

1. **Use Mock AI for Development**
   - Set `GEMINI_API_KEY=` (empty) for testing

2. **Monitor Usage**
   - Check Railway/Vercel dashboards regularly
   - Monitor API usage in Google AI Studio

3. **Optimize Requests**
   - Cache results when possible
   - Implement rate limiting

---

## Security Best Practices

1. **Never commit API keys**
   - Use `.env` files (add to `.gitignore`)
   - Use platform environment variables

2. **Enable HTTPS**
   - Use platform-provided SSL (free)
   - Or use Cloudflare for additional protection

3. **Rate Limiting**
   - Implement on backend to prevent abuse
   - Consider adding CAPTCHA for public deployments

4. **API Key Rotation**
   - Rotate Gemini API keys periodically
   - Update in deployment platform

---

## Support & Updates

### Updating Deployed Application

**Backend:**
```bash
cd resume-ai-backend
./mvnw clean package -DskipTests
railway up  # or git push heroku main
```

**Frontend:**
```bash
cd resume-frontend
npm run build
vercel --prod  # or netlify deploy --prod
```

### Getting Help

- Check backend logs
- Test API endpoints individually
- Verify environment variables
- Review CORS configuration

---

## Success! 🎉

Your AI Resume Maker is now live and ready to help users create professional resumes!

**Next Steps:**
1. Share your application URL
2. Monitor usage and performance
3. Collect user feedback
4. Iterate and improve

**Example URLs:**
- Frontend: `https://ai-resume-maker.vercel.app`
- Backend: `https://resume-api.up.railway.app`

---

*Made with ❤️ - AI Resume Maker Team*
