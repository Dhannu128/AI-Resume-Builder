import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaRobot, FaCheckCircle, FaDownload, FaPrint, FaRocket } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import ResumeFormBuilder from '../components/ResumeFormBuilder';
import ProfessionalTemplate from '../components/ResumeTemplates/ProfessionalTemplate';
import ModernTemplate from '../components/ResumeTemplates/ModernTemplate';
import ExecutiveTemplate from '../components/ResumeTemplates/ExecutiveTemplate';
import ClassicATSTemplate from '../components/ResumeTemplates/ClassicATSTemplate';

const CreateResume = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('choice'); // 'choice', 'ai', 'form', 'template', 'preview'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Template options
  const templates = [
    {
      id: 'classic-ats',
      name: 'Classic ATS',
      description: 'Maximum ATS compatibility',
      atsScore: 100,
      component: ClassicATSTemplate,
      preview: '📋 Simple, clean format optimized for ATS parsing. Industry standard for technical roles.',
      bestFor: 'Engineering, Technical Roles, Research, Manufacturing, Large Corporations'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Classic ATS-friendly design',
      atsScore: 100,
      component: ProfessionalTemplate,
      preview: '📄 Clean, traditional layout with blue accents. Perfect for corporate roles.',
      bestFor: 'Banking, Finance, Consulting, Traditional Industries'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Two-column creative design',
      atsScore: 99,
      component: ModernTemplate,
      preview: '🎨 Eye-catching two-column design with purple gradient. Stands out while staying professional.',
      bestFor: 'Tech, Startups, Creative Roles, Marketing'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Leadership-focused bold design',
      atsScore: 100,
      component: ExecutiveTemplate,
      preview: '👔 Bold, authoritative design emphasizing achievements. Perfect for senior positions.',
      bestFor: 'C-Suite, Senior Management, Leadership Roles'
    }
  ];

  // Handle AI generation
  const handleAIGenerate = async () => {
    if (!aiDescription.trim() || aiDescription.length < 50) {
      toast.error('Please provide at least 50 characters describing your experience');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userDescription: aiDescription })
      });

      if (!response.ok) throw new Error('Failed to generate resume');

      const data = await response.json();
      setResumeData(data.data.resume);
      toast.success('Resume generated successfully!');
      setStep('template');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form completion
  const handleFormComplete = (formData) => {
    setResumeData(formData);
    setStep('template');
    toast.success('Resume data saved! Now choose a template.');
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setStep('preview');
  };

  // Get selected template component
  const SelectedTemplateComponent = selectedTemplate 
    ? templates.find(t => t.id === selectedTemplate)?.component 
    : null;

  // Download resume
  const handleDownload = () => {
    window.print();
    toast.success('Resume ready for download!');
  };

  // Render step content
  const renderContent = () => {
    switch(step) {
      case 'choice':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  Create Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Professional Resume</span>
                </h1>
                <p className="text-xl text-gray-600">Choose how you'd like to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* AI-Powered Option */}
                <div 
                  onClick={() => setStep('ai')}
                  className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-600"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaRobot className="text-4xl text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">AI-Powered Generation</h2>
                  <p className="text-gray-600 text-center mb-4">
                    Describe your experience and let our AI create a professional resume for you in seconds
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Fast & Easy (2 minutes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>AI-optimized content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>ATS-friendly format</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    Get Started with AI
                  </button>
                </div>

                {/* Manual Form Option */}
                <div 
                  onClick={() => setStep('form')}
                  className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-600"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaFileAlt className="text-4xl text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Manual Form Builder</h2>
                  <p className="text-gray-600 text-center mb-4">
                    Fill out a detailed form with complete control over every section of your resume
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Complete Control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Step-by-step guidance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Add unlimited sections</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    Start Manual Form
                  </button>
                </div>
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                  <FaRobot className="text-3xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Generator</h2>
                <p className="text-gray-600">Describe your experience and our AI will create your resume</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe Your Professional Experience
                  </label>
                  <textarea
                    value={aiDescription}
                    onChange={(e) => setAiDescription(e.target.value)}
                    rows="10"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                    placeholder="Example:&#10;&#10;Senior React Developer with 5 years of experience building modern web applications. Expert in React, TypeScript, Next.js, and Redux. Built 10+ enterprise applications with AWS and Azure cloud deployment. Looking for senior frontend architect role.&#10;&#10;Include:&#10;• Your role & years of experience&#10;• Key technologies & skills&#10;• Notable projects & achievements&#10;• Career goals"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">Minimum 50 characters for best results</p>
                    <p className={`text-sm font-semibold ${aiDescription.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                      {aiDescription.length} characters
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Pro Tips:</strong>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Be specific about technologies and years of experience</li>
                      <li>Mention quantifiable achievements (e.g., "10+ projects", "1M+ users")</li>
                      <li>Include cloud platforms, frameworks, and tools you've used</li>
                      <li>State your career goals or target role</li>
                    </ul>
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep('choice')}
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleAIGenerate}
                    disabled={isGenerating || aiDescription.length < 50}
                    className={`
                      px-8 py-3 rounded-lg font-semibold text-white transition-all
                      ${isGenerating || aiDescription.length < 50
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:scale-105'}
                    `}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </span>
                    ) : (
                      'Generate Resume with AI →'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <ResumeFormBuilder 
            onComplete={handleFormComplete}
            onCancel={() => setStep('choice')}
          />
        );

      case 'template':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Choose Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Resume Template</span>
                </h2>
                <p className="text-xl text-gray-600">All templates are 99-100% ATS-optimized for maximum success</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="group bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-600"
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
                        <div className="bg-green-100 px-3 py-1 rounded-full">
                          <span className="text-green-700 font-bold text-sm">ATS: {template.atsScore}%</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{template.description}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-700">
                      {template.preview}
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Best For:</p>
                      <p className="text-sm text-gray-700">{template.bestFor}</p>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg group-hover:shadow-lg transition-all">
                      Select Template
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setStep(step === 'template' && aiDescription ? 'ai' : 'form')}
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  ← Back to Edit
                </button>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-[8.5in] mx-auto">
              {/* Action Bar */}
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6 print:hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                  <button
                    onClick={() => setStep('template')}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    ← Change Template
                  </button>
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => {
                        const resumeText = JSON.stringify(resumeData);
                        navigate('/interview-prep-enhanced', { 
                          state: { resumeContent: resumeText }
                        });
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <FaRocket /> Prepare for Interview
                    </button>
                    
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      <FaPrint /> Print
                    </button>
                    
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <FaDownload /> Download PDF
                    </button>
                  </div>
                </div>
                
                {/* Success Message */}
                <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-600 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>✅ Resume Created!</strong> Now prepare for your interview with company-specific questions.
                  </p>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="bg-white shadow-2xl print:shadow-none">
                {SelectedTemplateComponent && resumeData && (
                  <SelectedTemplateComponent resume={resumeData} className="p-8 print:p-0" />
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {renderContent()}
    </>
  );
};

export default CreateResume;
