import React from 'react';
import { FaFileAlt, FaSearch, FaUserTie, FaSyncAlt, FaShieldAlt, FaPalette } from 'react-icons/fa';

function Services() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "AI Resume Generation",
        "1 Resume Template",
        "Basic ATS Optimization",
        "PDF Download",
        "Limited Edits"
      ],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "/month",
      popular: true,
      features: [
        "Everything in Starter",
        "10+ Professional Templates",
        "Advanced ATS Optimization",
        "Cover Letter Generator",
        "Unlimited Edits & Downloads",
        "Priority Support"
      ],
      cta: "Try Professional"
    },
    {
      name: "Premium",
      price: "$24.99",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited Templates",
        "LinkedIn Profile Optimization",
        "Interview Preparation Tools",
        "Career Coaching Session",
        "24/7 Dedicated Support"
      ],
      cta: "Go Premium"
    }
  ];

  return (
    <div className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-base-content/80">
            Everything you need to land your dream job, powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FaFileAlt className="text-4xl text-primary" />,
              title: "AI Resume Builder",
              description: "Create professional, ATS-optimized resumes in minutes with our intelligent AI writer."
            },
            {
              icon: <FaSearch className="text-4xl text-secondary" />,
              title: "Job Search Tools",
              description: "Smart job matching and application tracking to streamline your job search."
            },
            {
              icon: <FaUserTie className="text-4xl text-accent" />,
              title: "Career Coaching",
              description: "Personalized guidance from our career experts to help you navigate your career path."
            },
            {
              icon: <FaSyncAlt className="text-4xl text-primary" />,
              title: "Resume Updates",
              description: "Keep your resume current with automatic updates when you gain new skills or experience."
            },
            {
              icon: <FaShieldAlt className="text-4xl text-secondary" />,
              title: "ATS Optimization",
              description: "Ensure your resume passes through applicant tracking systems used by employers."
            },
            {
              icon: <FaPalette className="text-4xl text-accent" />,
              title: "Custom Designs",
              description: "Choose from professionally designed templates tailored to your industry."
            }
          ].map((service, index) => (
            <div key={index} className="card p-6 text-center hover:border-primary transition-colors">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-base-content/80">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How Our AI Resume Builder Works</h2>
          <div className="flex justify-center mb-8">
            <div className="steps">
              <div className="step step-primary">Describe Yourself</div>
              <div className="step step-primary">AI Analysis</div>
              <div className="step step-primary">Generate Resume</div>
              <div className="step step-primary">Download & Apply</div>
            </div>
          </div>
          <div className="card bg-base-200 border border-base-300 p-8 max-w-4xl mx-auto">
            <p className="text-lg mb-4">
              Our AI analyzes thousands of successful resumes in your industry to create a personalized, 
              professional resume that highlights your strengths and experiences in the most effective way.
            </p>
            <p className="text-lg">
              The result? A resume that gets noticed by employers and passes through Applicant Tracking 
              Systems with ease.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="badge badge-primary absolute top-0 right-0 -mt-4 -mr-4 transform rotate-12">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-lg">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-primary text-primary-content p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs with AI Resume Maker
          </p>
          <button className="btn btn-secondary btn-lg">
            Start Building Your Resume Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services;