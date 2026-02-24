import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaLightbulb, FaArrowLeft, FaRedo, FaCopy, FaBuilding, 
  FaChartLine, FaBrain, FaCode, FaUsers, FaStar, FaCheckCircle,
  FaFire, FaRocket, FaBriefcase
} from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Enhanced Interview Preparation Component
 * Features:
 * - Company-specific questions from real datasets
 * - Difficulty levels (Easy, Medium, Hard)
 * - Category-based questions (Technical, Behavioral, Leadership)
 * - One-click prep from resume
 * - Standalone feature with manual input
 */
const InterviewPrepEnhanced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState('choice'); // 'choice', 'company', 'custom', 'questions'
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    resumeContent: location.state?.resumeContent || '',
    jobDescription: '',
    company: '',
    role: ''
  });
  const [preparation, setPreparation] = useState(null);

  // Top companies with real interview patterns
  const topCompanies = [
    {
      id: 'google',
      name: 'Google',
      icon: '🔍',
      color: 'from-blue-500 to-green-500',
      focus: ['Algorithms', 'System Design', 'Googleyness'],
      difficulty: 'Hard',
      rounds: '5-6 rounds',
      tips: 'Focus on scalability and clean code'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: '🪟',
      color: 'from-blue-600 to-cyan-500',
      focus: ['Problem Solving', 'System Design', 'Collaboration'],
      difficulty: 'Medium-Hard',
      rounds: '4-5 rounds',
      tips: 'Emphasize teamwork and Azure knowledge'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: '📦',
      color: 'from-orange-500 to-yellow-500',
      focus: ['Leadership Principles', 'Algorithms', 'Behavioral'],
      difficulty: 'Hard',
      rounds: '5-7 rounds',
      tips: '14 leadership principles are crucial'
    },
    {
      id: 'meta',
      name: 'Meta (Facebook)',
      icon: '👍',
      color: 'from-blue-500 to-purple-500',
      focus: ['Coding', 'System Design', 'Product Sense'],
      difficulty: 'Hard',
      rounds: '5-6 rounds',
      tips: 'Move fast and build things mindset'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: '🍎',
      color: 'from-gray-700 to-gray-900',
      focus: ['Design', 'iOS/macOS', 'Attention to Detail'],
      difficulty: 'Hard',
      rounds: '4-5 rounds',
      tips: 'Think different, focus on user experience'
    },
    {
      id: 'netflix',
      name: 'Netflix',
      icon: '🎬',
      color: 'from-red-600 to-red-800',
      focus: ['Culture Fit', 'High Performance', 'Innovation'],
      difficulty: 'Hard',
      rounds: '4-6 rounds',
      tips: 'Freedom & responsibility culture'
    }
  ];

  // Generate company-specific questions
  const generateCompanyQuestions = async (company) => {
    setLoading(true);
    try {
      const companyData = topCompanies.find(c => c.id === company);
      
      // Create resume content from location state or default
      let resumeText = formData.resumeContent || location.state?.resumeContent || '';
      
      // If resume is JSON string, extract text content
      if (resumeText.startsWith('{')) {
        try {
          const resumeObj = JSON.parse(resumeText);
          resumeText = `
            Name: ${resumeObj.personalInfo?.fullName || 'Professional'}
            Email: ${resumeObj.personalInfo?.email || ''}
            Phone: ${resumeObj.personalInfo?.phone || ''}
            
            Professional Summary: ${resumeObj.summary || 'Experienced professional'}
            
            Skills: ${resumeObj.skills?.map(s => s.name).join(', ') || 'Multiple technical skills'}
            
            Experience: ${resumeObj.experience?.map(exp => 
              `${exp.position} at ${exp.company} - ${exp.achievements?.join('; ')}`
            ).join('\n') || 'Several years of professional experience'}
            
            Education: ${resumeObj.education?.map(edu => 
              `${edu.degree} in ${edu.field} from ${edu.institution}`
            ).join('\n') || 'Bachelor\'s degree'}
          `.trim();
        } catch (e) {
          console.log('Resume is not JSON, using as is');
        }
      }
      
      // If still empty, use a default
      if (!resumeText || resumeText.trim().length < 20) {
        resumeText = 'Experienced software engineer with expertise in full-stack development, algorithms, and system design. Strong problem-solving skills and team collaboration.';
      }

      console.log('Sending request with resume length:', resumeText.length);
      
      const response = await fetch('http://localhost:8080/api/v1/interview/prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeContent: resumeText,
          jobDescription: `${formData.role || 'Software Engineer'} position at ${companyData.name}.
          
Interview Focus Areas: ${companyData.focus.join(', ')}
Interview Difficulty: ${companyData.difficulty}
Interview Rounds: ${companyData.rounds}
Company Culture & Tips: ${companyData.tips}

Generate interview questions specifically tailored for ${companyData.name}'s interview process. Focus on their known interview patterns and company culture. Include questions about ${companyData.focus.join(', ')}.`
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      setPreparation({
        summary: data.summary,
        questions: data.questions,
        company: companyData
      });
      setStep('questions');
      toast.success(`${companyData.name} interview questions generated!`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate questions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate custom questions
  const generateCustomQuestions = async () => {
    if (!formData.resumeContent.trim()) {
      toast.error('Please provide your resume content');
      return;
    }
    
    if (!formData.jobDescription.trim()) {
      toast.error('Please provide a job description');
      return;
    }

    setLoading(true);
    try {
      console.log('Generating custom questions...');
      console.log('Resume length:', formData.resumeContent.length);
      console.log('Job description:', formData.jobDescription);
      
      const response = await fetch('http://localhost:8080/api/v1/interview/prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeContent: formData.resumeContent,
          jobDescription: formData.jobDescription
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      setPreparation({
        summary: data.summary,
        questions: data.questions
      });
      setStep('questions');
      toast.success('Interview questions generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate questions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Render choice screen
  const renderChoice = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <FaLightbulb className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Interview <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Preparation</span>
          </h1>
          <p className="text-xl text-gray-600">Choose your preparation method</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {/* Company-Specific */}
          <div 
            onClick={() => setStep('company')}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-600"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBuilding className="text-4xl text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Company-Specific Prep</h2>
            <p className="text-gray-600 text-center mb-4">
              Prepare for top tech companies with real interview patterns from actual datasets
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Google, Amazon, Microsoft, Meta</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Real interview questions database</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Company culture insights</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Choose Company
            </button>
          </div>

          {/* Custom Preparation */}
          <div 
            onClick={() => setStep('custom')}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-600"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBrain className="text-4xl text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Custom Preparation</h2>
            <p className="text-gray-600 text-center mb-4">
              Generate tailored questions based on your resume and specific job description
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Resume-specific questions</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Job description analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Personalized preparation</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Start Custom Prep
            </button>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 font-semibold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );

  // Render company selection
  const renderCompanySelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Select <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Target Company</span>
          </h2>
          <p className="text-xl text-gray-600">Choose the company you're interviewing with</p>
        </div>

        {/* Optional: Resume & Role Input */}
        <div className="max-w-2xl mx-auto mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Role (Optional)
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g., Senior Software Engineer, Product Manager"
              />
            </div>
            {!formData.resumeContent && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume Summary (Optional)
                </label>
                <textarea
                  value={formData.resumeContent}
                  onChange={(e) => setFormData({...formData, resumeContent: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                  placeholder="Brief summary of your experience (or leave empty for general questions)"
                />
              </div>
            )}
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => {
                setSelectedCompany(company.id);
                generateCompanyQuestions(company.id);
              }}
              className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-600"
            >
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${company.color} rounded-full text-3xl mb-3 group-hover:scale-110 transition-transform`}>
                  {company.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-semibold text-orange-600">{company.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rounds:</span>
                  <span className="font-semibold text-blue-600">{company.rounds}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Focus Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {company.focus.map((area, i) => (
                    <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-700">
                  <FaFire className="inline text-orange-500 mr-1" />
                  <strong>Tip:</strong> {company.tips}
                </p>
              </div>

              <button 
                disabled={loading && selectedCompany === company.id}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading && selectedCompany === company.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </span>
                ) : (
                  <>Prepare for {company.name}</>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setStep('choice')}
            className="text-gray-600 hover:text-gray-900 font-semibold"
          >
            ← Back to Options
          </button>
        </div>
      </div>
    </div>
  );

  // Render custom form
  const renderCustomForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-4">
            <FaBrain className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Custom Interview Preparation</h2>
          <p className="text-gray-600">Provide your details for personalized questions</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.resumeContent}
              onChange={(e) => setFormData({...formData, resumeContent: e.target.value})}
              rows="8"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Paste your resume content or summarize your experience, skills, and projects..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description (Optional)
            </label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
              rows="6"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Paste the job description for more targeted questions..."
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> The more details you provide, the better and more relevant the interview questions will be!
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
              onClick={generateCustomQuestions}
              disabled={loading || !formData.resumeContent.trim()}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white transition-all
                ${loading || !formData.resumeContent.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:scale-105'}
              `}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </span>
              ) : (
                'Generate Questions →'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render questions
  const renderQuestions = () => {
    if (!preparation) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with Company Info */}
          {preparation.company && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${preparation.company.color} rounded-full flex items-center justify-center text-3xl`}>
                    {preparation.company.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{preparation.company.name} Interview Prep</h2>
                    <p className="text-gray-600">{formData.role || 'General Position'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="text-lg font-bold text-orange-600">{preparation.company.difficulty}</div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaChartLine className="text-purple-600" />
                Preparation Summary
              </h3>
              <button 
                onClick={() => handleCopy(preparation.summary)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all text-sm font-semibold"
              >
                <FaCopy /> Copy
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{preparation.summary}</p>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interview Questions ({preparation.questions.length})</h3>
            
            <div className="space-y-4">
              {preparation.questions.map((q, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex-1">
                      <span className="text-purple-600 mr-2">Q{index + 1}.</span>
                      {q.question}
                    </h4>
                    <button 
                      onClick={() => handleCopy(q.question)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <FaCopy className="text-gray-500" />
                    </button>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {q.category}
                    </span>
                  </div>

                  {q.hint && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                        <FaLightbulb /> Show Hint
                      </summary>
                      <div className="mt-2 p-3 bg-purple-50 rounded-lg text-sm text-gray-700">
                        {q.hint}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(preparation.company ? 'company' : 'choice')}
              className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              ← Start Over
            </button>
            <button
              onClick={() => preparation.company ? generateCompanyQuestions(preparation.company.id) : generateCustomQuestions()}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Generating...' : '🔄 Generate More Questions'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <>
      {step === 'choice' && renderChoice()}
      {step === 'company' && renderCompanySelection()}
      {step === 'custom' && renderCustomForm()}
      {step === 'questions' && renderQuestions()}
    </>
  );
};

export default InterviewPrepEnhanced;
