import React, { useState } from 'react';
import axios from 'axios';
import './GenerateResume.css';

const GenerateResume = () => {
  const [userDescription, setUserDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDescription.trim()) {
      setError('Please enter your professional description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/resume', {
        userDescription: userDescription.trim()
      });

      if (response.data && response.data.data && response.data.data.resume) {
        setResume(response.data.data.resume);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error generating resume:', err);
      setError(err.response?.data?.message || 'Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserDescription('');
    setResume(null);
    setError('');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🤖 AI Resume Generator</h1>
        <p>Transform your professional story into a stunning resume with AI</p>
      </div>

      {!resume ? (
        <div className="main-content">
          <div className="form-container">
            <h2>Tell us about yourself</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="description">Professional Description</label>
                <textarea
                  id="description"
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  placeholder="Describe your professional background, skills, experience, education, and career goals..."
                  rows={8}
                  disabled={loading}
                />
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="button-group">
                <button 
                  type="submit" 
                  disabled={loading || !userDescription.trim()}
                  className="generate-btn"
                >
                  {loading ? 'Generating Resume...' : 'Generate Resume with AI'}
                </button>
                
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="reset-btn"
                  disabled={loading}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="resume-container">
          <div className="resume-header">
            <h2>Your Generated Resume</h2>
            <button onClick={handleReset} className="new-resume-btn">
              Generate New Resume
            </button>
          </div>
          
          <div className="resume-content">
            {resume.personalInformation && (
              <section className="resume-section">
                <h3>Personal Information</h3>
                <div className="personal-info">
                  <h4>{resume.personalInformation.name}</h4>
                  <p>{resume.personalInformation.email}</p>
                  <p>{resume.personalInformation.phone}</p>
                  <p>{resume.personalInformation.address}</p>
                </div>
              </section>
            )}

            {resume.summary && (
              <section className="resume-section">
                <h3>Professional Summary</h3>
                <p>{resume.summary}</p>
              </section>
            )}

            {resume.skills && resume.skills.length > 0 && (
              <section className="resume-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {resume.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {resume.experience && resume.experience.length > 0 && (
              <section className="resume-section">
                <h3>Work Experience</h3>
                {resume.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4>{exp.position}</h4>
                    <p className="company">{exp.company}</p>
                    <p className="duration">{exp.duration}</p>
                    <p className="description">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resume.education && resume.education.length > 0 && (
              <section className="resume-section">
                <h3>Education</h3>
                {resume.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4>{edu.degree}</h4>
                    <p className="institution">{edu.institution}</p>
                    <p className="year">{edu.year}</p>
                  </div>
                ))}
              </section>
            )}

            {resume.projects && resume.projects.length > 0 && (
              <section className="resume-section">
                <h3>Projects</h3>
                {resume.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4>{project.name}</h4>
                    <p className="description">{project.description}</p>
                    {project.technologies && (
                      <p className="technologies">Technologies: {project.technologies}</p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
