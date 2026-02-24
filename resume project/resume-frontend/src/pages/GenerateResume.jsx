import React, { useState } from 'react';
import axios from 'axios';

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

    if (userDescription.trim().length < 50) {
      setError('Please provide more details (at least 50 characters)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/resume', {
        userDescription: userDescription.trim()
      }, {
        timeout: 60000
      });

      if (response.data && response.data.data && response.data.data.resume) {
        console.log('Resume received:', response.data.data.resume);
        setResume(response.data.data.resume);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error generating resume:', err);
      setError(err.response?.data?.message || 'Failed to generate resume. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserDescription('');
    setResume(null);
    setError('');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          🤖 AI Resume Generator
        </h1>
        <p className="text-xl text-white/90 font-medium">
          Create a professional resume powered by AI in seconds
        </p>
      </div>

      {!resume ? (
        <div className="max-w-5xl mx-auto">
          {/* Main Form Card */}
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
              <h2 className="card-title text-3xl mb-2">Tell us about yourself</h2>
              <p className="text-base-content/70 mb-6">
                Describe your education, skills, experience, and achievements
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Textarea Input */}
                <div className="form-control">
                  <label className="label" htmlFor="description">
                    <span className="label-text text-lg font-semibold">Your Professional Story</span>
                  </label>
                  <textarea
                    id="description"
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    placeholder="Example: I am Dhannu, pursuing B.Tech from IIIT Allahabad in IT Business. I have a CGPA of 9+. I completed internships at Amazon and Flipkart where I worked on backend development and API design. I am skilled in Java, Spring Boot, React, Python, AWS, Docker. I have built projects like a Resume AI Maker and an E-commerce platform..."
                    rows={12}
                    disabled={loading}
                    className="textarea textarea-bordered textarea-lg w-full text-base leading-relaxed"
                  />
                  <label className="label">
                    <span className="label-text-alt"></span>
                    <span className={`label-text-alt font-semibold ${userDescription.length < 50 ? 'text-error' : 'text-success'}`}>
                      {userDescription.length} / 50 characters minimum
                    </span>
                  </label>
                </div>
                
                {/* Error Alert */}
                {error && (
                  <div className="alert alert-error shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit" 
                    disabled={loading || userDescription.trim().length < 50}
                    className="btn btn-primary btn-lg flex-1 text-lg font-bold"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Generating Your Resume...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Resume with AI
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn btn-outline btn-lg"
                    disabled={loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                </div>
              </form>

              {/* Tips Section */}
              <div className="mt-8 alert alert-info shadow-lg">
                <div className="w-full">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tips for best results
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Include your name and contact information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Mention your education and qualifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Describe your work experience and internships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>List your technical skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Add any projects you've worked on</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span>Include achievements and certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Action Bar */}
          <div className="card bg-base-100 shadow-xl mb-6 no-print">
            <div className="card-body p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="card-title text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your Professional Resume
                </h2>
                <div className="flex gap-3">
                  <button onClick={handleDownloadPDF} className="btn btn-success gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                  <button onClick={handleReset} className="btn btn-primary gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Generate New
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resume Content */}
          <div className="card bg-base-100 shadow-2xl" id="resume-content">
            <div className="card-body p-12 space-y-8">
              
              {/* Personal Information Header */}
              {resume.personalInformation && (
                <div className="text-center pb-8 border-b-4 border-primary">
                  <h1 className="text-5xl font-bold text-primary mb-4">
                    {resume.personalInformation.fullName || resume.personalInformation.name || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-6 text-base-content/80 mb-4">
                    {resume.personalInformation.email && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{resume.personalInformation.email}</span>
                      </div>
                    )}
                    {resume.personalInformation.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{resume.personalInformation.phoneNumber}</span>
                      </div>
                    )}
                    {resume.personalInformation.location && (
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{resume.personalInformation.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {resume.personalInformation.linkedIn && (
                      <a href={resume.personalInformation.linkedIn} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-primary gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {resume.personalInformation.gitHub && (
                      <a href={resume.personalInformation.gitHub} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-primary gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {resume.personalInformation.portfolio && (
                      <a href={resume.personalInformation.portfolio} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-primary gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Professional Summary */}
              {resume.summary && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Professional Summary</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <p className="text-base-content leading-relaxed text-lg">{resume.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resume.skills && resume.skills.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Skills</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {resume.skills.map((skill, index) => (
                      <div key={index} className="badge badge-lg badge-primary badge-outline p-4 text-base font-semibold">
                        {typeof skill === 'string' ? skill : skill.title || skill.name}
                        {skill.level && typeof skill === 'object' && (
                          <span className="ml-2 text-xs opacity-70">({skill.level})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {resume.experience && resume.experience.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Work Experience</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="space-y-6">
                    {resume.experience.map((exp, index) => (
                      <div key={index} className="card bg-base-200 border-l-4 border-primary">
                        <div className="card-body">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <h3 className="card-title text-2xl">{exp.jobTitle || exp.position || 'Position'}</h3>
                            <div className="badge badge-primary badge-lg">{exp.duration || exp.period || ''}</div>
                          </div>
                          <div className="flex gap-4 text-base-content/70">
                            <p className="font-semibold">{exp.company || 'Company'}</p>
                            {exp.location && (
                              <p className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {exp.location}
                              </p>
                            )}
                          </div>
                          {exp.responsibility && (
                            <p className="text-base-content/80 leading-relaxed mt-2">{exp.responsibility}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resume.education && resume.education.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Education</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="space-y-6">
                    {resume.education.map((edu, index) => (
                      <div key={index} className="card bg-base-200 border-l-4 border-secondary">
                        <div className="card-body">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <h3 className="card-title text-2xl">{edu.degree || 'Degree'}</h3>
                            <div className="badge badge-secondary badge-lg">{edu.graduationYear || edu.year || ''}</div>
                          </div>
                          <div className="flex gap-4 text-base-content/70">
                            <p className="font-semibold">{edu.university || edu.institution || 'Institution'}</p>
                            {edu.location && (
                              <p className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {edu.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Projects</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="space-y-6">
                    {resume.projects.map((project, index) => (
                      <div key={index} className="card bg-base-200 border-l-4 border-accent">
                        <div className="card-body">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <h3 className="card-title text-2xl">{project.title || project.name || 'Project'}</h3>
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-accent gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View
                              </a>
                            )}
                          </div>
                          {project.description && (
                            <p className="text-base-content/80 leading-relaxed">{project.description}</p>
                          )}
                          {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-semibold text-base-content/70 mb-2">Technologies:</p>
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(project.technologiesUsed) ? project.technologiesUsed : [project.technologiesUsed]).map((tech, techIndex) => (
                                  <span key={techIndex} className="badge badge-accent">{tech}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Certifications</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="space-y-4">
                    {resume.certifications.map((cert, index) => (
                      <div key={index} className="card bg-base-200 border-l-4 border-warning">
                        <div className="card-body p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <h3 className="font-bold text-lg">{cert.title || 'Certification'}</h3>
                            <div className="badge badge-warning">{cert.year || ''}</div>
                          </div>
                          {cert.issuingOrganization && (
                            <p className="text-base-content/70">{cert.issuingOrganization}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {resume.achievements && resume.achievements.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Achievements</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="space-y-4">
                    {resume.achievements.map((achievement, index) => (
                      <div key={index} className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="w-full">
                          <h3 className="font-bold">{achievement.title || 'Achievement'}</h3>
                          {achievement.year && <p className="text-sm opacity-70">Year: {achievement.year}</p>}
                          {achievement.extraInformation && <p className="text-sm mt-1">{achievement.extraInformation}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {resume.languages && resume.languages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Languages</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="flex flex-wrap gap-3">
                    {resume.languages.map((lang, index) => (
                      <div key={index} className="badge badge-lg badge-info p-4 text-base font-semibold">
                        {typeof lang === 'string' ? lang : lang.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {resume.interests && resume.interests.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-primary">Interests</h2>
                  </div>
                  <div className="divider my-1"></div>
                  <div className="flex flex-wrap gap-3">
                    {resume.interests.map((interest, index) => (
                      <div key={index} className="badge badge-lg badge-outline p-4 text-base">
                        {typeof interest === 'string' ? interest : interest.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
