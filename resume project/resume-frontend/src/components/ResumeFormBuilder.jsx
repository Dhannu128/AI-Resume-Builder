import React, { useState } from 'react';
import { 
  FaUser, FaBriefcase, FaGraduationCap, FaCode, 
  FaCertificate, FaTrophy, FaLanguage, FaHeart,
  FaArrowRight, FaArrowLeft, FaCheck, FaPlus, FaTrash
} from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Multi-Step Resume Form - Beautiful, Interactive, User-Friendly
 * Features: Step-by-step navigation, field validation, add/remove items
 */
const ResumeFormBuilder = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form Data State
  const [formData, setFormData] = useState({
    personalInformation: {
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      linkedIn: '',
      gitHub: '',
      portfolio: ''
    },
    summary: '',
    skills: [{ title: '', level: 'Proficient' }],
    experience: [{
      jobTitle: '',
      company: '',
      location: '',
      duration: '',
      responsibility: ''
    }],
    education: [{
      degree: '',
      university: '',
      location: '',
      graduationYear: ''
    }],
    certifications: [],
    projects: [],
    achievements: [],
    languages: [],
    interests: []
  });

  // Update form data
  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Update array item
  const updateArrayItem = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add array item
  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  // Remove array item
  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Validation
  const validateStep = (step) => {
    switch(step) {
      case 1: // Personal Info
        if (!formData.personalInformation.fullName.trim()) {
          toast.error('Please enter your full name');
          return false;
        }
        if (!formData.personalInformation.email.trim()) {
          toast.error('Please enter your email');
          return false;
        }
        return true;
      case 2: // Summary
        if (!formData.summary.trim() || formData.summary.length < 50) {
          toast.error('Please write a professional summary (minimum 50 characters)');
          return false;
        }
        return true;
      case 3: // Skills
        if (formData.skills.length === 0 || !formData.skills[0].title.trim()) {
          toast.error('Please add at least one skill');
          return false;
        }
        return true;
      case 4: // Experience
        const hasExperience = formData.experience.some(exp => exp.jobTitle.trim() && exp.company.trim());
        if (!hasExperience) {
          toast.error('Please add at least one work experience');
          return false;
        }
        return true;
      case 5: // Education
        const hasEducation = formData.education.some(edu => edu.degree.trim() && edu.university.trim());
        if (!hasEducation) {
          toast.error('Please add at least one education entry');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // Clean empty arrays
    const cleanedData = {
      ...formData,
      certifications: formData.certifications.filter(c => c.title && c.title.trim()),
      projects: formData.projects.filter(p => p.title && p.title.trim()),
      achievements: formData.achievements.filter(a => a.title && a.title.trim()),
      languages: formData.languages.filter(l => l.name && l.name.trim()),
      interests: formData.interests.filter(i => i.name && i.name.trim())
    };
    
    onComplete(cleanedData);
    toast.success('Resume created successfully!');
  };

  // Step Content Renderer
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateField={updateField} />;
      case 2:
        return <SummaryStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <SkillsStep formData={formData} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 4:
        return <ExperienceStep formData={formData} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 5:
        return <EducationStep formData={formData} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 6:
        return <CertProjectsStep formData={formData} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 7:
        return <ExtrasStep formData={formData} updateArrayItem={updateArrayItem} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  transition-all duration-300
                  ${currentStep >= step 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110' 
                    : 'bg-gray-200 text-gray-500'}
                `}>
                  {currentStep > step ? <FaCheck /> : step}
                </div>
                {step < 7 && (
                  <div className={`
                    w-12 h-1 mx-2
                    ${currentStep > step ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                transition-all duration-300
                ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105'}
              `}
            >
              <FaArrowLeft /> Previous
            </button>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {currentStep === totalSteps ? (
                  <>
                    <FaCheck /> Create Resume
                  </>
                ) : (
                  <>
                    Next <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function
const getStepTitle = (step) => {
  const titles = {
    1: 'Personal Information',
    2: 'Professional Summary',
    3: 'Skills & Expertise',
    4: 'Work Experience',
    5: 'Education',
    6: 'Certifications & Projects',
    7: 'Additional Information'
  };
  return titles[step];
};

// Step 1: Personal Information
const PersonalInfoStep = ({ formData, updateField }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaUser className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
      <p className="text-gray-600">Let's start with your contact details</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.personalInformation.fullName}
          onChange={(e) => updateField('personalInformation', 'fullName', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.personalInformation.email}
          onChange={(e) => updateField('personalInformation', 'email', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.personalInformation.phoneNumber}
          onChange={(e) => updateField('personalInformation', 'phoneNumber', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={formData.personalInformation.location}
          onChange={(e) => updateField('personalInformation', 'location', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="San Francisco, CA"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          LinkedIn Profile
        </label>
        <input
          type="url"
          value={formData.personalInformation.linkedIn}
          onChange={(e) => updateField('personalInformation', 'linkedIn', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          GitHub Profile
        </label>
        <input
          type="url"
          value={formData.personalInformation.gitHub}
          onChange={(e) => updateField('personalInformation', 'gitHub', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="https://github.com/johndoe"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Portfolio Website
        </label>
        <input
          type="url"
          value={formData.personalInformation.portfolio}
          onChange={(e) => updateField('personalInformation', 'portfolio', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
          placeholder="https://johndoe.com"
        />
      </div>
    </div>
  </div>
);

// Step 2: Summary
const SummaryStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaUser className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Summary</h2>
      <p className="text-gray-600">Tell us about yourself and your career goals</p>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Professional Summary <span className="text-red-500">*</span>
      </label>
      <textarea
        value={formData.summary}
        onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
        rows="8"
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
        placeholder="Write a compelling summary highlighting your experience, skills, and career objectives. Include years of experience, key technologies, and what makes you unique..."
      />
      <div className="flex justify-between mt-2">
        <p className="text-sm text-gray-500">Minimum 50 characters</p>
        <p className={`text-sm font-semibold ${formData.summary.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
          {formData.summary.length} characters
        </p>
      </div>
    </div>

    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
      <p className="text-sm text-gray-700">
        <strong>💡 Tip:</strong> A great summary includes your role, years of experience, key skills, 
        and what you're looking for. Example: "Senior Software Engineer with 5+ years building scalable 
        web applications using React and Node.js..."
      </p>
    </div>
  </div>
);

// Step 3: Skills
const SkillsStep = ({ formData, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaCode className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
      <p className="text-gray-600">Add your technical and professional skills</p>
    </div>

    <div className="space-y-4">
      {formData.skills.map((skill, index) => (
        <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={skill.title}
                onChange={(e) => updateArrayItem('skills', index, 'title', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="e.g., React, Python, Project Management"
              />
            </div>
            <select
              value={skill.level}
              onChange={(e) => updateArrayItem('skills', index, 'level', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
            >
              <option value="Proficient">Proficient</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          {formData.skills.length > 1 && (
            <button
              onClick={() => removeArrayItem('skills', index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}
    </div>

    <button
      onClick={() => addArrayItem('skills', { title: '', level: 'Proficient' })}
      className="w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
    >
      <FaPlus /> Add Another Skill
    </button>
  </div>
);

// Step 4: Experience
const ExperienceStep = ({ formData, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaBriefcase className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h2>
      <p className="text-gray-600">Add your professional work history</p>
    </div>

    <div className="space-y-6">
      {formData.experience.map((exp, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-900">Position {index + 1}</h3>
            {formData.experience.length > 1 && (
              <button
                onClick={() => removeArrayItem('experience', index)}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg transition-all flex items-center gap-1"
              >
                <FaTrash /> Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => updateArrayItem('experience', index, 'jobTitle', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Google Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateArrayItem('experience', index, 'duration', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="01/2020 - Present"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateArrayItem('experience', index, 'location', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Responsibilities & Achievements</label>
              <textarea
                value={exp.responsibility}
                onChange={(e) => updateArrayItem('experience', index, 'responsibility', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                placeholder="• Led a team of 5 developers&#10;• Built scalable microservices handling 1M+ requests/day&#10;• Reduced deployment time by 40%"
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => addArrayItem('experience', { jobTitle: '', company: '', location: '', duration: '', responsibility: '' })}
      className="w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
    >
      <FaPlus /> Add Another Position
    </button>
  </div>
);

// Step 5: Education
const EducationStep = ({ formData, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaGraduationCap className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
      <p className="text-gray-600">Add your educational background</p>
    </div>

    <div className="space-y-6">
      {formData.education.map((edu, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-900">Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                onClick={() => removeArrayItem('education', index)}
                className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg transition-all flex items-center gap-1"
              >
                <FaTrash /> Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">University *</label>
              <input
                type="text"
                value={edu.university}
                onChange={(e) => updateArrayItem('education', index, 'university', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Stanford University"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
              <input
                type="text"
                value={edu.graduationYear}
                onChange={(e) => updateArrayItem('education', index, 'graduationYear', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="2020"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateArrayItem('education', index, 'location', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Stanford, CA"
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => addArrayItem('education', { degree: '', university: '', location: '', graduationYear: '' })}
      className="w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
    >
      <FaPlus /> Add Another Degree
    </button>
  </div>
);

// Step 6: Certifications & Projects
const CertProjectsStep = ({ formData, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaCertificate className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Certifications & Projects</h2>
      <p className="text-gray-600">Showcase your credentials and notable work</p>
    </div>

    {/* Certifications */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCertificate className="text-purple-600" /> Certifications (Optional)
      </h3>
      <div className="space-y-4">
        {formData.certifications.map((cert, index) => (
          <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateArrayItem('certifications', index, 'title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="AWS Certified"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={cert.issuingOrganization}
                  onChange={(e) => updateArrayItem('certifications', index, 'issuingOrganization', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="Amazon"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => updateArrayItem('certifications', index, 'year', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="2023"
                />
              </div>
            </div>
            <button
              onClick={() => removeArrayItem('certifications', index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('certifications', { title: '', issuingOrganization: '', year: '' })}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Certification
        </button>
      </div>
    </div>

    {/* Projects */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCode className="text-purple-600" /> Projects (Optional)
      </h3>
      <div className="space-y-4">
        {formData.projects.map((project, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Project {index + 1}</h4>
              <button
                onClick={() => removeArrayItem('projects', index)}
                className="px-2 py-1 text-red-600 hover:bg-red-100 rounded transition-all"
              >
                <FaTrash />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateArrayItem('projects', index, 'title', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                placeholder="Project Name"
              />
              <textarea
                value={project.description}
                onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
                rows="2"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all resize-none"
                placeholder="Brief description of the project..."
              />
              <input
                type="text"
                value={project.technologiesUsed ? project.technologiesUsed.join(', ') : ''}
                onChange={(e) => updateArrayItem('projects', index, 'technologiesUsed', e.target.value.split(',').map(s => s.trim()))}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                placeholder="Technologies (comma-separated): React, Node.js, MongoDB"
              />
              <input
                type="url"
                value={project.githubLink || ''}
                onChange={(e) => updateArrayItem('projects', index, 'githubLink', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                placeholder="GitHub link (optional)"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('projects', { title: '', description: '', technologiesUsed: [], githubLink: '' })}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Project
        </button>
      </div>
    </div>

    {/* Achievements */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaTrophy className="text-purple-600" /> Achievements (Optional)
      </h3>
      <div className="space-y-3">
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateArrayItem('achievements', index, 'title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="Achievement title"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={achievement.year}
                  onChange={(e) => updateArrayItem('achievements', index, 'year', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="Year"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={achievement.extraInformation}
                  onChange={(e) => updateArrayItem('achievements', index, 'extraInformation', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
                  placeholder="Details"
                />
              </div>
            </div>
            <button
              onClick={() => removeArrayItem('achievements', index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('achievements', { title: '', year: '', extraInformation: '' })}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Achievement
        </button>
      </div>
    </div>
  </div>
);

// Step 7: Extras
const ExtrasStep = ({ formData, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
        <FaHeart className="text-3xl text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Additional Information</h2>
      <p className="text-gray-600">Add languages and interests (optional)</p>
    </div>

    {/* Languages */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaLanguage className="text-purple-600" /> Languages
      </h3>
      <div className="space-y-3">
        {formData.languages.map((lang, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="text"
              value={lang.name}
              onChange={(e) => updateArrayItem('languages', index, 'name', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
              placeholder="e.g., English (Native), Spanish (Fluent)"
            />
            <button
              onClick={() => removeArrayItem('languages', index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('languages', { name: '' })}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Language
        </button>
      </div>
    </div>

    {/* Interests */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaHeart className="text-purple-600" /> Interests & Hobbies
      </h3>
      <div className="space-y-3">
        {formData.interests.map((interest, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="text"
              value={interest.name}
              onChange={(e) => updateArrayItem('interests', index, 'name', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-600 transition-all"
              placeholder="e.g., Open Source Contribution, Photography"
            />
            <button
              onClick={() => removeArrayItem('interests', index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('interests', { name: '' })}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Interest
        </button>
      </div>
    </div>

    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-6">
      <p className="text-sm text-gray-700">
        <strong>🎉 Almost done!</strong> Click "Create Resume" to generate your professional resume with your chosen template!
      </p>
    </div>
  </div>
);

export default ResumeFormBuilder;
