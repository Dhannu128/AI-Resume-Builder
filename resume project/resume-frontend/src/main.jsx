import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Root from './pages/Root';
import LandingPage from './pages/LandingPage';
import LandingPageNew from './pages/LandingPageNew';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import GenerateResume from './pages/GenerateResume';
import GenerateResumeNew from './pages/GenerateResumeNew';
import CreateResume from './pages/CreateResume';
import InterviewPrep from './components/InterviewPrep.jsx';
import InterviewPrepEnhanced from './components/InterviewPrepEnhanced.jsx';
import ApiTest from './pages/ApiTest';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<LandingPageNew />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="create-resume" element={<CreateResume />} />
          <Route path="generate-resume" element={<GenerateResumeNew />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="interview-prep-enhanced" element={<InterviewPrepEnhanced />} />
          <Route path="api-test" element={<ApiTest />} />
          <Route path="old-landing" element={<LandingPage />} />
          <Route path="old-resume" element={<GenerateResume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);