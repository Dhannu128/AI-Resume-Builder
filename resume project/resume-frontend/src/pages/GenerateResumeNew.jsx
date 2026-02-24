import React, { useState } from 'react';
import axios from 'axios';
import { FaRocket, FaMagic, FaDownload, FaPrint, FaShare, FaEdit, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';

const GenerateResumeNew = () => {
  const [userDescription, setUserDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sampleDescriptions = [
    "Software Engineer with 5 years of experience in React, Node.js, Python. Built 20+ web applications. B.Tech in Computer Science from IIT Delhi with 8.5 CGPA.",
    "Marketing Manager with 7 years experience in digital marketing, SEO, content strategy. Led campaigns that increased revenue by 40%. MBA from ISB.",
    "Data Scientist with expertise in Python, Machine Learning, TensorFlow. Published 3 research papers. M.S. in Data Science from Stanford."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userDescription.trim()) {
      toast.error('Please enter your professional description');
      return;
    }

    if (userDescription.trim().length < 50) {
      toast.error('Please provide more details (at least 50 characters)');
      return;
    }

    setLoading(true);
    setError('');

    const toastId = toast.loading('AI is crafting your professional resume...');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/resume', {
        userDescription: userDescription.trim()
      }, {
        timeout: 60000
      });

      if (response.data && response.data.data && response.data.data.resume) {
        setResume(response.data.data.resume);
        toast.success('Resume generated successfully! 🎉', { id: toastId });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error generating resume:', err);
      const errorMsg = err.response?.data?.message || 'Failed to generate resume. Please check if backend is running.';
      setError(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserDescription('');
    setResume(null);
    setError('');
  };

  const handlePrint = () => {
    window.print();
  };

  const useSampleDescription = (sample) => {
    setUserDescription(sample);
    toast.success('Sample description loaded!');
  };

  const handleDownloadPDF = () => {
    toast.success('Preparing PDF download...');
    window.print();
  };

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
        <Toaster position="top-right" />
        
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg">
                <HiSparkles className="inline mr-2" />
                AI-Powered Resume Generator
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Create Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Perfect Resume</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let AI transform your experience into a professional, ATS-optimized resume in seconds
            </p>
          </div>

          {/* Main Form Card */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="card bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="card-body p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Textarea Input */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-bold text-gray-800">
                          <FaEdit className="inline mr-2 text-purple-600" />
                          Tell Us About Yourself
                        </span>
                      </label>
                      <textarea
                        value={userDescription}
                        onChange={(e) => setUserDescription(e.target.value)}
                        placeholder="Example: I am a Software Engineer with 5 years of experience in full-stack development. I have worked at top tech companies like Google and Amazon. I specialize in React, Node.js, Python, and AWS. I hold a B.Tech degree from IIT Delhi with a CGPA of 9.2. I have built multiple scalable applications serving millions of users. I am passionate about clean code, system design, and mentoring junior developers..."
                        rows={14}
                        disabled={loading}
                        className="textarea textarea-bordered w-full text-base leading-relaxed focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      />
                      <label className="label">
                        <span className="label-text-alt text-gray-500">
                          {userDescription.length < 50 ? 'Minimum 50 characters required' : 'Looking good! ✓'}
                        </span>
                        <span className={`label-text-alt font-bold ${userDescription.length < 50 ? 'text-error' : 'text-success'}`}>
                          {userDescription.length} / 50 chars
                        </span>
                      </label>
                    </div>

                    {/* Sample Descriptions */}
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <p className="text-sm font-semibold text-purple-900 mb-3">
                        <HiLightningBolt className="inline mr-1" />
                        Quick Start - Try a Sample:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sampleDescriptions.map((sample, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => useSampleDescription(sample)}
                            className="btn btn-sm bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs"
                          >
                            Sample {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        type="submit" 
                        disabled={loading || userDescription.trim().length < 50}
                        className="btn btn-lg flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                      >
                        {loading ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            AI is Working Magic...
                          </>
                        ) : (
                          <>
                            <FaMagic className="mr-2" />
                            Generate Resume with AI
                          </>
                        )}
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={handleReset}
                        className="btn btn-lg btn-outline border-2 hover:bg-gray-100"
                        disabled={loading}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="space-y-6">
              {/* Tips Card */}
              <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl">
                <div className="card-body p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <HiSparkles className="text-2xl" />
                    Pro Tips for Best Results
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      'Include your full name and contact details',
                      'Mention your educational qualifications with grades',
                      'List your work experience and internships with specific achievements',
                      'Detail your technical skills and tools you use',
                      'Add notable projects with technologies used',
                      'Include certifications and awards',
                      'Be specific with numbers and metrics'
                    ].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features Card */}
              <div className="card bg-white shadow-xl">
                <div className="card-body p-6">
                  <h3 className="font-bold text-lg mb-4">What You'll Get</h3>
                  <div className="space-y-3">
                    {[
                      { icon: <FaRocket />, text: 'ATS-Optimized Format', color: 'text-blue-500' },
                      { icon: <HiSparkles />, text: 'Professional Layout', color: 'text-purple-500' },
                      { icon: <FaMagic />, text: 'AI-Enhanced Content', color: 'text-pink-500' },
                      { icon: <FaDownload />, text: 'Instant Download', color: 'text-green-500' }
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`${feature.color} text-xl`}>{feature.icon}</div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resume Preview Section
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="container mx-auto max-w-6xl">
        {/* Action Bar */}
        <div className="card bg-white shadow-xl mb-8 no-print rounded-2xl overflow-hidden">
          <div className="card-body p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Resume Generated Successfully! 🎉</h2>
                  <p className="text-sm text-gray-500">Your professional resume is ready</p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <button 
                  onClick={handleDownloadPDF} 
                  className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:shadow-xl"
                >
                  <FaDownload className="mr-2" />
                  Download PDF
                </button>
                <button 
                  onClick={handlePrint} 
                  className="btn btn-outline border-2"
                >
                  <FaPrint className="mr-2" />
                  Print
                </button>
                <button 
                  onClick={handleReset} 
                  className="btn btn-outline border-2"
                >
                  <FaRocket className="mr-2" />
                  Create New
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume Content */}
        <div className="card bg-white shadow-2xl rounded-2xl overflow-hidden" id="resume-content">
          <div className="card-body p-12 md:p-16 space-y-8 print:p-8">
            
            {/* Header */}
            {resume.personalInformation && (
              <div className="text-center pb-8 border-b-4 border-purple-600">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                  {resume.personalInformation.fullName || resume.personalInformation.name || 'Your Name'}
                </h1>
                
                <div className="flex flex-wrap justify-center gap-6 text-gray-700 text-base mb-4">
                  {resume.personalInformation.email && (
                    <div className="flex items-center gap-2 font-medium">
                      <span>📧</span>
                      <span>{resume.personalInformation.email}</span>
                    </div>
                  )}
                  {resume.personalInformation.phoneNumber && (
                    <div className="flex items-center gap-2 font-medium">
                      <span>📱</span>
                      <span>{resume.personalInformation.phoneNumber}</span>
                    </div>
                  )}
                  {resume.personalInformation.location && (
                    <div className="flex items-center gap-2 font-medium">
                      <span>📍</span>
                      <span>{resume.personalInformation.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {resume.personalInformation.linkedIn && (
                    <a href={resume.personalInformation.linkedIn} target="_blank" rel="noopener noreferrer" 
                       className="badge badge-lg badge-primary gap-2 px-4 py-3 no-print hover:scale-105 transform transition-transform">
                      LinkedIn →
                    </a>
                  )}
                  {resume.personalInformation.gitHub && (
                    <a href={resume.personalInformation.gitHub} target="_blank" rel="noopener noreferrer" 
                       className="badge badge-lg badge-secondary gap-2 px-4 py-3 no-print hover:scale-105 transform transition-transform">
                      GitHub →
                    </a>
                  )}
                  {resume.personalInformation.portfolio && (
                    <a href={resume.personalInformation.portfolio} target="_blank" rel="noopener noreferrer" 
                       className="badge badge-lg badge-accent gap-2 px-4 py-3 no-print hover:scale-105 transform transition-transform">
                      Portfolio →
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {resume.summary && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg pl-5">{resume.summary}</p>
              </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  SKILLS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-5">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-lg text-center font-semibold text-gray-800">
                      {typeof skill === 'string' ? skill : skill.title || skill.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {resume.experience && resume.experience.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-6 pl-5">
                  {resume.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-purple-300 pl-6 hover:border-purple-600 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{exp.jobTitle || exp.position || 'Position'}</h3>
                        <span className="text-purple-600 font-semibold">{exp.duration || exp.period || ''}</span>
                      </div>
                      <p className="font-semibold text-gray-700 mb-2">{exp.company || 'Company'} {exp.location && `• ${exp.location}`}</p>
                      {exp.responsibility && (
                        <p className="text-gray-600 leading-relaxed">{exp.responsibility}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  EDUCATION
                </h2>
                <div className="space-y-6 pl-5">
                  {resume.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-purple-300 pl-6 hover:border-purple-600 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{edu.degree || 'Degree'}</h3>
                        <span className="text-purple-600 font-semibold">{edu.graduationYear || edu.year || ''}</span>
                      </div>
                      <p className="font-semibold text-gray-700">{edu.university || edu.institution || 'Institution'} {edu.location && `• ${edu.location}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  PROJECTS
                </h2>
                <div className="space-y-6 pl-5">
                  {resume.projects.map((project, index) => (
                    <div key={index} className="border-l-4 border-purple-300 pl-6 hover:border-purple-600 transition-colors">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title || project.name || 'Project'}</h3>
                      {project.description && (
                        <p className="text-gray-600 leading-relaxed mb-3">{project.description}</p>
                      )}
                      {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(project.technologiesUsed) ? project.technologiesUsed : [project.technologiesUsed]).map((tech, techIndex) => (
                            <span key={techIndex} className="badge badge-outline text-purple-700 border-purple-300">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  CERTIFICATIONS
                </h2>
                <div className="space-y-3 pl-5">
                  {resume.certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{cert.title || 'Certification'}</h3>
                        {cert.issuingOrganization && (
                          <p className="text-gray-600">{cert.issuingOrganization}</p>
                        )}
                      </div>
                      {cert.year && <span className="text-purple-600 font-semibold">{cert.year}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {resume.achievements && resume.achievements.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded"></span>
                  ACHIEVEMENTS
                </h2>
                <div className="space-y-3 pl-5">
                  {resume.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-purple-600 text-xl mt-1">🏆</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{achievement.title || 'Achievement'}</h3>
                        {achievement.extraInformation && <p className="text-gray-600 text-sm">{achievement.extraInformation}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default GenerateResumeNew;
