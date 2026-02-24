import React, { useRef } from 'react';
import { 
  FaGithub, FaLinkedin, FaPhone, FaEnvelope, 
  FaDownload, FaLightbulb 
} from 'react-icons/fa';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const Resume = ({ data }) => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const handleDownloadPdf = () => {
    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInformation.fullName || 'resume'}.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };

  const handleInterviewPrep = () => {
    navigate('/interview-prep', { state: { resumeContent: JSON.stringify(data) }});
  };

  const renderSection = (title, items, renderItem) => (
    <section className="mb-6">
      <h2 className="text-2xl font-bold text-primary mb-3 pb-2 border-b border-primary/20">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="card bg-base-200 border border-base-300 p-4">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div ref={resumeRef} className="bg-base-100 shadow-2xl rounded-xl p-8 border border-base-300">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {data.personalInformation.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-secondary mb-4">
            {data.personalInformation.jobTitle || "Professional Title"}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {data.personalInformation.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center gap-2 text-base-content hover:text-primary transition-colors"
              >
                <FaEnvelope /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation.phoneNumber && (
              <a
                href={`tel:${data.personalInformation.phoneNumber}`}
                className="flex items-center gap-2 text-base-content hover:text-primary transition-colors"
              >
                <FaPhone /> {data.personalInformation.phoneNumber}
              </a>
            )}
          </div>
          
          <div className="flex justify-center gap-4">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {data.personalInformation.linkedIn && (
              <a
                href={data.personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-3 pb-2 border-b border-primary/20">Summary</h2>
            <p className="text-base-content">{data.summary}</p>
          </section>
        )}

        {/* Skills Section */}
        {data.skills?.length > 0 && renderSection(
          "Skills",
          data.skills,
          (skill) => (
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.title}</span>
                <span className="text-secondary">{skill.level}</span>
              </div>
              <progress 
                className="progress progress-primary w-full" 
                value={parseInt(skill.level)} 
                max="100"
              />
            </div>
          )
        )}

        {/* Experience Section */}
        {data.experience?.length > 0 && renderSection(
          "Experience",
          data.experience,
          (exp) => (
            <div>
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                <div className="badge badge-primary">{exp.duration}</div>
              </div>
              <p className="text-secondary mb-2">{exp.company} | {exp.location}</p>
              <p className="text-base-content">{exp.responsibility}</p>
            </div>
          )
        )}

        {/* Education Section */}
        {data.education?.length > 0 && renderSection(
          "Education",
          data.education,
          (edu) => (
            <div>
              <div className="flex flex-wrap justify-between items-start mb-1">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <div className="badge badge-secondary">{edu.graduationYear}</div>
              </div>
              <p className="text-secondary mb-2">{edu.university}, {edu.location}</p>
              {edu.gpa && <p className="text-base-content">GPA: {edu.gpa}</p>}
            </div>
          )
        )}

        {/* Projects Section */}
        {data.projects?.length > 0 && renderSection(
          "Projects",
          data.projects,
          (proj) => (
            <div>
              <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
              <p className="text-base-content mb-2">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {proj.technologiesUsed?.map((tech, i) => (
                  <span key={i} className="badge badge-outline">{tech}</span>
                ))}
              </div>
              {proj.githubLink && (
                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary flex items-center gap-1"
                >
                  View on GitHub
                </a>
              )}
            </div>
          )
        )}

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certifications */}
          {data.certifications?.length > 0 && renderSection(
            "Certifications",
            data.certifications,
            (cert) => (
              <div>
                <h3 className="font-bold">{cert.title}</h3>
                <p className="text-secondary">{cert.issuingOrganization} - {cert.year}</p>
              </div>
            )
          )}

          {/* Languages */}
          {data.languages?.length > 0 && renderSection(
            "Languages",
            data.languages,
            (lang) => (
              <div>
                <span className="font-medium">{lang.name}</span>
                {lang.level && <span className="text-secondary ml-2">({lang.level})</span>}
              </div>
            )
          )}

          {/* Interests */}
          {data.interests?.length > 0 && renderSection(
            "Interests",
            data.interests,
            (interest) => (
              <span className="badge badge-primary badge-outline mr-2 mb-2">
                {interest.name}
              </span>
            )
          )}

          {/* Achievements */}
          {data.achievements?.length > 0 && renderSection(
            "Achievements",
            data.achievements,
            (ach) => (
              <div>
                <h3 className="font-bold">{ach.title}</h3>
                <p className="text-secondary">{ach.year}</p>
                <p className="text-base-content">{ach.extraInformation}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <button 
          onClick={handleDownloadPdf} 
          className="btn btn-primary gap-2"
        >
          <FaDownload /> Download as PDF
        </button>
        <button 
          onClick={handleInterviewPrep}
          className="btn btn-secondary gap-2"
        >
          <FaLightbulb /> Prepare for Interview
        </button>
      </div>
    </div>
  );
};

export default Resume;