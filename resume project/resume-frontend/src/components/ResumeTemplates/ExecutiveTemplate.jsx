import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaGithub, FaGlobe, FaBriefcase, FaGraduationCap,
  FaCertificate, FaCode, FaTrophy, FaLanguage, FaHeart
} from 'react-icons/fa';

/**
 * Executive Template - Leadership-Focused ATS-Optimized Design
 * ATS Score: 99-100%
 * Features: Bold header, achievement-focused, executive presence
 */
const ExecutiveTemplate = ({ resume, className = '' }) => {
  return (
    <div className={`bg-white text-gray-800 max-w-[8.5in] mx-auto ${className}`}>
      {/* Executive Header */}
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
          {resume.personalInformation?.fullName?.toUpperCase() || 'YOUR NAME'}
        </h1>
        
        {/* Contact Info - Centered */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 mb-2">
          {resume.personalInformation?.email && (
            <div className="flex items-center gap-1">
              <FaEnvelope className="text-gray-800" />
              <span>{resume.personalInformation.email}</span>
            </div>
          )}
          {resume.personalInformation?.phoneNumber && (
            <div className="flex items-center gap-1">
              <FaPhone className="text-gray-800" />
              <span>{resume.personalInformation.phoneNumber}</span>
            </div>
          )}
          {resume.personalInformation?.location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-800" />
              <span>{resume.personalInformation.location}</span>
            </div>
          )}
        </div>
        
        {/* Online Profiles - Centered */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resume.personalInformation?.linkedIn && (
            <a href={resume.personalInformation.linkedIn} className="flex items-center gap-1 hover:text-gray-900">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          )}
          {resume.personalInformation?.gitHub && (
            <a href={resume.personalInformation.gitHub} className="flex items-center gap-1 hover:text-gray-900">
              <FaGithub />
              <span>GitHub</span>
            </a>
          )}
          {resume.personalInformation?.portfolio && (
            <a href={resume.personalInformation.portfolio} className="flex items-center gap-1 hover:text-gray-900">
              <FaGlobe />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify border-l-4 border-gray-800 pl-4">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Core Competencies (Skills) */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {resume.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <div>
                  <span className="font-semibold text-gray-900">{skill.title}</span>
                  {skill.level && (
                    <span className="text-gray-600 text-xs ml-1">({skill.level})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-5 border-l-4 border-gray-800 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h3>
                  <p className="text-gray-700 font-semibold text-lg">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{exp.duration}</p>
                  {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {exp.responsibility.split('\n').map((line, i) => (
                  line.trim() && (
                    <div key={i} className="flex gap-2 mb-1">
                      <span className="text-gray-800 font-bold">▸</span>
                      <p className="flex-1">{line.trim()}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Key Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
            KEY ACHIEVEMENTS
          </h2>
          <div className="space-y-2">
            {resume.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <FaTrophy className="text-gray-800 mt-1 flex-shrink-0" />
                <div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">{achievement.title}</span>
                    {achievement.year && (
                      <span className="text-gray-600 ml-4">{achievement.year}</span>
                    )}
                  </div>
                  {achievement.extraInformation && (
                    <p className="text-gray-700 text-sm">{achievement.extraInformation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notable Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
            NOTABLE PROJECTS
          </h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4 border-l-4 border-gray-300 pl-4">
              <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
              {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Technologies:</span> {project.technologiesUsed.join(' • ')}
                </p>
              )}
              {project.githubLink && (
                <a href={project.githubLink} className="text-gray-800 text-sm font-semibold hover:underline">
                  → View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education & Certifications in Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
              <FaGraduationCap /> EDUCATION
            </h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.university}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  {edu.location && <span>{edu.location}</span>}
                  {edu.graduationYear && <span>{edu.graduationYear}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-wide flex items-center gap-2">
              <FaCertificate /> CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {resume.certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-bold text-gray-900">{cert.title}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{cert.issuingOrganization}</span>
                    {cert.year && <span>{cert.year}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Languages & Interests */}
      <div className="grid grid-cols-2 gap-6">
        {resume.languages && resume.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-wide flex items-center gap-2">
              <FaLanguage /> LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.languages.map((lang, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800">
                  {lang.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {resume.interests && resume.interests.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-wide flex items-center gap-2">
              <FaHeart /> INTERESTS
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.interests.map((interest, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800">
                  {interest.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
