import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLightbulb, FaArrowLeft, FaRedo, FaCopy } from 'react-icons/fa';
import { generateInterviewQuestions } from '../services/interviewService';
import toast from 'react-hot-toast';

const InterviewPrep = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preparation, setPreparation] = useState(null);
  const [formData, setFormData] = useState({
    resumeContent: '',
    jobDescription: ''
  });

  useEffect(() => {
    if (location.state?.resumeContent) {
      try {
        const content = JSON.parse(location.state.resumeContent);
        setFormData(prev => ({
          ...prev,
          resumeContent: JSON.stringify(content, null, 2)
        }));
      } catch {
        setFormData(prev => ({
          ...prev,
          resumeContent: location.state.resumeContent
        }));
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.resumeContent.trim()) {
      toast.error('Resume content is required');
      return;
    }

    try {
      setLoading(true);
      const data = await generateInterviewQuestions(
        formData.resumeContent,
        formData.jobDescription
      );
      setPreparation(data);
      toast.success('Interview questions generated!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="card-body p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => navigate(-1)} 
                className="btn btn-ghost btn-circle"
              >
                <FaArrowLeft />
              </button>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaLightbulb className="text-primary" /> Interview Preparation
              </h1>
            </div>

            {!preparation ? (
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Resume Content</span>
                  </label>
                  <textarea
                    name="resumeContent"
                    className="textarea textarea-bordered h-48 text-lg"
                    placeholder="Paste your resume content here..."
                    value={formData.resumeContent}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Target Job Description (Optional)</span>
                    <span className="label-text-alt">For more relevant questions</span>
                  </label>
                  <textarea
                    name="jobDescription"
                    className="textarea textarea-bordered h-32 text-lg"
                    placeholder="Paste job description here..."
                    value={formData.jobDescription}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="form-control mt-8">
                  <button 
                    onClick={handleGenerate}
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <FaLightbulb className="mr-2" />
                    )}
                    Generate Interview Questions
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
                    <span>Interview Summary</span>
                    <button 
                      onClick={() => handleCopy(preparation.summary)}
                      className="btn btn-ghost btn-sm"
                    >
                      <FaCopy /> Copy
                    </button>
                  </h2>
                  <p className="text-base-content bg-base-200 p-4 rounded-lg">
                    {preparation.summary}
                  </p>
                </div>

                <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
                <div className="space-y-6">
                  {preparation.questions.map((q, index) => (
                    <div key={index} className="card bg-base-200 border border-base-300">
                      <div className="card-body">
                        <div className="flex justify-between items-start">
                          <h3 className="card-title">{index + 1}. {q.question}</h3>
                          <div className="flex gap-2">
                            <span className="badge badge-outline">{q.category}</span>
                            <span className="badge badge-secondary">{q.difficulty}</span>
                          </div>
                        </div>
                        
                        {q.hint && (
                          <div className="mt-4 collapse collapse-arrow border border-base-300 rounded-box">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium">
                              Show Hint
                            </div>
                            <div className="collapse-content">
                              <p>{q.hint}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="card-actions justify-end mt-4">
                          <button 
                            onClick={() => handleCopy(q.question)}
                            className="btn btn-ghost btn-sm"
                          >
                            <FaCopy /> Copy Question
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button 
                    onClick={() => setPreparation(null)}
                    className="btn btn-outline"
                  >
                    <FaArrowLeft className="mr-2" /> Back to Form
                  </button>
                  <button 
                    onClick={handleGenerate}
                    className="btn btn-primary"
                  >
                    <FaRedo className="mr-2" /> Generate More Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
