import React from 'react';
import { FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';

function About() {
  return (
    <div className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AI Resume Maker</h1>
          <p className="text-xl text-base-content/80">
            Revolutionizing the way professionals create resumes with the power of artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              Founded in 2023, AI Resume Maker was born from a simple idea: job searching shouldn't be painful. 
              Our team of career experts and AI specialists came together to create a tool that transforms the 
              resume creation process.
            </p>
            <p className="text-lg">
              Today, we've helped over 50,000 professionals land their dream jobs by creating resumes that 
              stand out in today's competitive job market.
            </p>
          </div>
          <div className="card bg-base-200 border border-base-300 overflow-hidden">
            <div className="aspect-video bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <div className="text-6xl text-white opacity-80">📊</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FaLightbulb className="text-4xl text-primary" />,
              title: "Our Mission",
              content: "To empower job seekers with AI tools that create professional resumes in minutes, not hours."
            },
            {
              icon: <FaUsers className="text-4xl text-secondary" />,
              title: "Our Team",
              content: "Career coaches, HR experts, and AI specialists working together to transform your job search."
            },
            {
              icon: <FaRocket className="text-4xl text-accent" />,
              title: "Our Vision",
              content: "To become the most trusted career development platform for professionals worldwide."
            }
          ].map((item, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-base-content/80">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="card bg-base-200 border border-base-300 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Describe Yourself", desc: "Share your professional background" },
              { step: "2", title: "AI Analysis", desc: "Our AI processes your information" },
              { step: "3", title: "Resume Creation", desc: "Professional resume generated" },
              { step: "4", title: "Download & Apply", desc: "Get hired faster" }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-base-content/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;