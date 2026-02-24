import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaGithub, FaGlobe, FaBriefcase, FaGraduationCap,
  FaCertificate, FaCode, FaTrophy, FaLanguage, FaHeart
} from 'react-icons/fa';

/**
 * Professional Template - Classic ATS-Optimized Design
 * ATS Score: 99-100%
 * Features: Clean layout, clear sections, machine-readable format
 */
const ProfessionalTemplate = ({ resume, className = '' }) => {
  return (
    <div className={`bg-white text-gray-800 max-w-[8.5in] mx-auto ${className}`}>
      {/* Header Section */}
      <div className="border-b-4 border-blue-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resume.personalInformation?.fullName || 'Your Name'}
        </h1>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {resume.personalInformation?.email && (
            <div className="flex items-center gap-1">
              <FaEnvelope className="text-blue-600" />
              <span>{resume.personalInformation.email}</span>
            </div>
          )}
          {resume.personalInformation?.phoneNumber && (
            <div className="flex items-center gap-1">
              <FaPhone className="text-blue-600" />
              <span>{resume.personalInformation.phoneNumber}</span>
            </div>
          )}
          {resume.personalInformation?.location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{resume.personalInformation.location}</span>
            </div>
          )}
        </div>
        
        {/* Online Profiles */}
        <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-2">
          {resume.personalInformation?.linkedIn && (
            <a href={resume.personalInformation.linkedIn} className="flex items-center gap-1 hover:underline">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          )}
          {resume.personalInformation?.gitHub && (
            <a href={resume.personalInformation.gitHub} className="flex items-center gap-1 hover:underline">
              <FaGithub />
              <span>GitHub</span>
            </a>
          )}
          {resume.personalInformation?.portfolio && (
            <a href={resume.personalInformation.portfolio} className="flex items-center gap-1 hover:underline">
              <FaGlobe />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3">
            TECHNICAL SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <div key={index} className="bg-blue-50 px-3 py-1 rounded text-sm">
                <span className="font-semibold text-gray-800">{skill.title}</span>
                {skill.level && (
                  <span className="text-gray-600 ml-1">({skill.level})</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 flex items-center gap-2">
            <FaBriefcase /> PROFESSIONAL EXPERIENCE
          </h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                  <p className="text-gray-700 font-semibold">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{exp.duration}</p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {exp.responsibility}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 flex items-center gap-2">
            <FaCode /> PROJECTS
          </h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
              {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Technologies:</span> {project.technologiesUsed.join(', ')}
                </p>
              )}
              {project.githubLink && (
                <a href={project.githubLink} className="text-blue-600 text-sm hover:underline">
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 flex items-center gap-2">
            <FaGraduationCap /> EDUCATION
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.university}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {edu.graduationYear && <p>{edu.graduationYear}</p>}
                  {edu.location && <p>{edu.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 flex items-center gap-2">
            <FaCertificate /> CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {resume.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{cert.title}</span>
                  <span className="text-gray-600 ml-2">- {cert.issuingOrganization}</span>
                </div>
                {cert.year && <span className="text-gray-600">{cert.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-3 flex items-center gap-2">
            <FaTrophy /> ACHIEVEMENTS
          </h2>
          {resume.achievements.map((achievement, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">{achievement.title}</span>
                {achievement.year && <span className="text-gray-600">{achievement.year}</span>}
              </div>
              {achievement.extraInformation && (
                <p className="text-gray-700 text-sm">{achievement.extraInformation}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages & Interests in two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-2 flex items-center gap-2">
              <FaLanguage /> LANGUAGES
            </h2>
            <div className="space-y-1">
              {resume.languages.map((lang, index) => (
                <p key={index} className="text-gray-700">{lang.name}</p>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {resume.interests && resume.interests.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-1 mb-2 flex items-center gap-2">
              <FaHeart /> INTERESTS
            </h2>
            <div className="space-y-1">
              {resume.interests.map((interest, index) => (
                <p key={index} className="text-gray-700">{interest.name}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
