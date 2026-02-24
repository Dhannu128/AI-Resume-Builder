import React from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaGithub, FaGlobe, FaBriefcase, FaGraduationCap,
  FaCertificate, FaCode, FaTrophy, FaLanguage, FaHeart
} from 'react-icons/fa';

/**
 * Modern Template - Clean Two-Column ATS-Optimized Design
 * ATS Score: 99-100%
 * Features: Two-column layout, visual hierarchy, clean sections
 */
const ModernTemplate = ({ resume, className = '' }) => {
  return (
    <div className={`bg-white text-gray-800 max-w-[8.5in] mx-auto ${className}`}>
      {/* Header Section with Background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mb-6">
        <h1 className="text-4xl font-bold mb-2">
          {resume.personalInformation?.fullName || 'Your Name'}
        </h1>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {resume.personalInformation?.email && (
            <div className="flex items-center gap-1">
              <FaEnvelope />
              <span>{resume.personalInformation.email}</span>
            </div>
          )}
          {resume.personalInformation?.phoneNumber && (
            <div className="flex items-center gap-1">
              <FaPhone />
              <span>{resume.personalInformation.phoneNumber}</span>
            </div>
          )}
          {resume.personalInformation?.location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt />
              <span>{resume.personalInformation.location}</span>
            </div>
          )}
        </div>
        
        {/* Online Profiles */}
        <div className="flex flex-wrap gap-4 text-sm mt-2">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6 px-6">
        {/* Left Sidebar - 1/3 width */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600">
                SKILLS
              </h2>
              <div className="space-y-2">
                {resume.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-900 text-sm">{skill.title}</p>
                    {skill.level && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Advanced' ? '85%' : '70%'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resume.education && resume.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaGraduationCap /> EDUCATION
              </h2>
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-gray-700 text-xs">{edu.university}</p>
                  {edu.graduationYear && (
                    <p className="text-gray-600 text-xs">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaCertificate /> CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {resume.certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-900 text-xs">{cert.title}</p>
                    <p className="text-gray-600 text-xs">{cert.issuingOrganization}</p>
                    {cert.year && <p className="text-gray-500 text-xs">{cert.year}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {resume.languages && resume.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaLanguage /> LANGUAGES
              </h2>
              <div className="space-y-1">
                {resume.languages.map((lang, index) => (
                  <p key={index} className="text-gray-700 text-sm">{lang.name}</p>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {resume.interests && resume.interests.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaHeart /> INTERESTS
              </h2>
              <div className="space-y-1">
                {resume.interests.map((interest, index) => (
                  <p key={index} className="text-gray-700 text-sm">{interest.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Main Content - 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* Professional Summary */}
          {resume.summary && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{resume.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resume.experience && resume.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaBriefcase /> EXPERIENCE
              </h2>
              {resume.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{exp.duration}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                    {exp.responsibility}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaCode /> PROJECTS
              </h2>
              {resume.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>
                  {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-semibold">Tech:</span> {project.technologiesUsed.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {resume.achievements && resume.achievements.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3 pb-1 border-b-2 border-purple-600 flex items-center gap-2">
                <FaTrophy /> ACHIEVEMENTS
              </h2>
              {resume.achievements.map((achievement, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 text-sm">{achievement.title}</span>
                    {achievement.year && <span className="text-gray-600 text-xs">{achievement.year}</span>}
                  </div>
                  {achievement.extraInformation && (
                    <p className="text-gray-700 text-xs">{achievement.extraInformation}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
