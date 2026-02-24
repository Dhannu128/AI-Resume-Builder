# AI Resume Generator Frontend

A modern React application for generating professional resumes using AI and preparing for interviews.

## 🚀 Features

- **AI-Powered Resume Generation**: Generate professional resumes from simple descriptions
- **Interactive Resume Builder**: Edit and customize your resume with a user-friendly form
- **Interview Preparation**: Get AI-generated interview questions based on your resume
- **PDF Export**: Download your resume as a high-quality PDF
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and DaisyUI components

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **PDF Generation**: jsPDF, html-to-image
- **Icons**: React Icons (Lucide, Font Awesome)
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend setup)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd resume-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   # Development
   VITE_API_BASE_URL=http://localhost:8080

   # Production (uncomment when deploying)
   # VITE_API_BASE_URL=https://resume-ai-backend-production.up.railway.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🌐 Backend Integration

This frontend connects to a Spring Boot backend API. Make sure your backend is running and accessible.

### API Endpoints Used:
- `POST /api/v1/resume` - Generate resume from description
- `POST /api/v1/resume/prepare-interview` - Generate interview questions

### Expected Response Format:
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
      "certifications": [...],
      "projects": [...],
      "languages": [...],
      "interests": [...]
    }
  }
}
```

## 📱 Usage

1. **Generate Resume**:
   - Navigate to "Build Resume" or `/generate-resume`
   - Enter your professional description
   - Click "Generate Resume" and wait for AI processing
   - Edit the generated resume in the form
   - Preview and download as PDF

2. **Interview Preparation**:
   - Navigate to "Interview Prep" or `/interview-prep`
   - Paste your resume content
   - Optionally add a job description
   - Get AI-generated interview questions with hints

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔧 Configuration

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL

### Vite Configuration
The project uses Vite for fast development and building. Configuration is in `vite.config.js`.

## 🎨 Styling

The project uses:
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind CSS
- **Custom themes**: Configured in `tailwind.config.js`

## 📁 Project Structure

```
src/
├── api/                 # API service functions
│   └── ResumeService.js
├── components/          # Reusable components
│   ├── InterviewPrep.js
│   ├── Navbar.jsx
│   └── Resume.jsx
├── pages/               # Page components
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── GenerateResume.jsx
│   ├── Home.jsx
│   ├── LandingPage.jsx
│   ├── Resume.jsx
│   ├── Root.jsx
│   └── Services.jsx
├── services/            # Additional services
│   └── interviewService.js
├── utils/               # Utility functions
│   └── errorHandler.js
├── App.css
├── index.css
└── main.jsx
```

## 🐛 Troubleshooting

### Common Issues:

1. **API Connection Failed**
   - Check if backend is running
   - Verify `VITE_API_BASE_URL` in `.env`
   - Check browser console for CORS errors

2. **Build Errors**
   - Run `npm run lint` to check for syntax errors
   - Ensure all dependencies are installed

3. **PDF Generation Issues**
   - Check browser console for canvas/image errors
   - Ensure resume content is properly rendered

### Debug Mode:
Enable detailed API logging by checking browser console. The app includes request/response interceptors for debugging.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Look at browser console for errors
3. Verify backend API is accessible
4. Check environment variables

---

**Happy Resume Building! 🎯**
