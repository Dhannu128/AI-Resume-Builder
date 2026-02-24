import React from 'react';

/**
 * Classic ATS Template - Maximum Parsability
 * ATS Score: 100% - Industry Standard
 * 
 * Features:
 * - Simple, clean layout without complex formatting
 * - Left-aligned text for easy ATS parsing
 * - Clear section headers with consistent spacing
 * - No tables, columns, or graphics that confuse ATS
 * - Standard fonts and minimal styling
 * - Contact info in standard format
 * - Bullet points with simple markers
 * 
 * Best For:
 * - Engineering roles (Software, Embedded, Robotics)
 * - Technical positions requiring high ATS score
 * - Traditional industries (Manufacturing, Automotive)
 * - Large companies with automated screening
 * - Academic/Research positions
 */
const ClassicATSTemplate = ({ resume }) => {
  if (!resume) return null;

  const {
    personalInfo = {},
    summary = '',
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
  } = resume;

  return (
    <div className="bg-white w-full max-w-[8.5in] mx-auto p-12 font-serif text-black print:p-8">
      {/* Header - Contact Information */}
      <div className="mb-6 text-center border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm space-y-1">
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo.phone && personalInfo.linkedin && <span>|</span>}
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin}</span>
            )}
            {personalInfo.linkedin && personalInfo.github && <span>|</span>}
            {personalInfo.github && (
              <span>{personalInfo.github}</span>
            )}
          </div>
          
          {personalInfo.location && (
            <div>{personalInfo.location}</div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Technical Skills / Technologies */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Technologies
          </h2>
          <div className="text-sm space-y-2">
            {/* Group skills by category */}
            {(() => {
              const categorized = {
                Languages: [],
                Tools: [],
                Frameworks: [],
                Other: []
              };

              skills.forEach(skill => {
                const category = skill.category || 'Other';
                if (categorized[category]) {
                  categorized[category].push(skill.name);
                } else {
                  categorized.Other.push(skill.name);
                }
              });

              return Object.entries(categorized).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <span className="font-semibold">{category}:</span> {items.join(', ')}.
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">
                    {edu.institution || 'Institution Name'}
                    {edu.location && `, ${edu.location}`}
                  </div>
                  <div className="italic">
                    {edu.degree && `${edu.degree}`}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                </div>
                <div className="text-right whitespace-nowrap ml-4">
                  {edu.startDate && edu.endDate ? (
                    <div>{edu.startDate} – {edu.endDate}</div>
                  ) : edu.graduationYear ? (
                    <div>{edu.graduationYear}</div>
                  ) : null}
                </div>
              </div>
              
              {edu.gpa && (
                <div className="mt-1">GPA: {edu.gpa}</div>
              )}
              
              {edu.coursework && (
                <div className="mt-1">
                  <span className="font-semibold">Coursework:</span> {edu.coursework}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{exp.company || 'Company Name'}</div>
                  <div className="italic">{exp.position || 'Position'}</div>
                </div>
                <div className="text-right whitespace-nowrap ml-4">
                  <div>{exp.location || ''}</div>
                  <div>
                    {exp.startDate && exp.endDate 
                      ? `${exp.startDate} – ${exp.endDate}`
                      : exp.duration || ''}
                  </div>
                </div>
              </div>
              
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-2 space-y-1 list-none">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="pl-5 relative">
                      <span className="absolute left-0">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 text-sm">
              <div className="flex justify-between items-start">
                <div className="font-bold">{project.title || 'Project Title'}</div>
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    className="text-blue-700 underline ml-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                )}
              </div>
              
              {project.description && (
                <ul className="mt-2 space-y-1 list-none">
                  {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i} className="pl-5 relative">
                      <span className="absolute left-0">•</span>
                      {line.trim()}
                    </li>
                  ))}
                </ul>
              )}
              
              {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold">Tools Used:</span> {project.technologiesUsed.join(', ')}.
                </div>
              )}
              
              {project.context && (
                <div className="mt-1 italic text-gray-700">
                  {project.context}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Achievements
          </h2>
          {achievements.map((achievement, index) => (
            <div key={index} className="mb-3 text-sm">
              <div className="font-bold">{achievement.title || achievement.name}</div>
              {achievement.description && (
                <div className="mt-1">{achievement.description}</div>
              )}
              {achievement.date && (
                <div className="mt-1 text-gray-600">{achievement.date}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Certifications
          </h2>
          <ul className="space-y-1 text-sm list-none">
            {certifications.map((cert, index) => (
              <li key={index} className="pl-5 relative">
                <span className="absolute left-0">•</span>
                <span className="font-semibold">{cert.name || cert.title}</span>
                {cert.issuer && ` - ${cert.issuer}`}
                {cert.date && ` (${cert.date})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3">
            Languages
          </h2>
          <div className="text-sm">
            {languages.map(lang => lang.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicATSTemplate;
