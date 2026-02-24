import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaUsers, FaRocket, FaFileAlt, FaSearch, FaUserTie } from 'react-icons/fa';

const LandingPage = () => {
  const features = [
    {
      icon: <FaLightbulb className="text-4xl text-primary" />,
      title: "AI-Powered",
      description: "Our advanced AI creates professional resumes tailored to your experience"
    },
    {
      icon: <FaFileAlt className="text-4xl text-secondary" />,
      title: "ATS Optimized",
      description: "Resumes formatted to pass through Applicant Tracking Systems"
    },
    {
      icon: <FaRocket className="text-4xl text-accent" />,
      title: "Time Saving",
      description: "Create a professional resume in minutes instead of hours"
    },
    {
      icon: <FaUsers className="text-4xl text-info" />,
      title: "Expert Tips",
      description: "Get personalized suggestions to improve your resume"
    },
    {
      icon: <FaSearch className="text-4xl text-success" />,
      title: "Job Matching",
      description: "Smart job recommendations based on your profile"
    },
    {
      icon: <FaUserTie className="text-4xl text-warning" />,
      title: "Career Coaching",
      description: "Personalized guidance from career experts"
    }
  ];

  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Sarah Johnson",
      title: "Marketing Director",
      quote: "I landed 3 interviews in the first week after using AI Resume Maker! The personalized suggestions made all the difference."
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Michael Chen",
      title: "Software Engineer",
      quote: "As a developer, I hate writing about myself. This tool transformed my technical experience into a compelling narrative."
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Jessica Williams",
      title: "Product Manager",
      quote: "Transitioning careers was challenging, but the AI Resume Maker helped highlight my transferable skills effectively."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Create Your <span className="text-primary">Professional Resume</span> in Minutes
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                Powered by AI technology, our resume builder creates personalized, ATS-friendly resumes that help you land more interviews and get hired faster.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/generate-resume" className="btn btn-primary btn-lg px-8 shadow-lg transform hover:-translate-y-1 transition-transform">
                  Build Your Resume Now
                </Link>
                <button className="btn btn-outline btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How It Works
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="mockup-window border bg-base-100 shadow-2xl w-full max-w-lg">
                  <div className="flex justify-center bg-base-100 p-8">
                    <img 
                      src="https://images.unsplash.com/photo-1616587894289-86480e533129" 
                      className="rounded-lg shadow-lg w-full h-auto object-cover border border-base-300" 
                      alt="Professional resume example" 
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                  <span className="font-bold">ATS Score:</span> 98%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Resume Maker?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">Professional resume building made simple with our AI-powered platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center p-8">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="card-title text-2xl mb-3">{feature.title}</h3>
                  <p className="opacity-80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Create Your Resume in 4 Simple Steps</h2>
            <p className="text-xl opacity-80">Get from blank page to job-ready resume in minutes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Describe Yourself", desc: "Share your professional background" },
              { step: "2", title: "AI Analysis", desc: "Our AI processes your information" },
              { step: "3", title: "Resume Creation", desc: "Professional resume generated" },
              { step: "4", title: "Download & Apply", desc: "Get hired faster" }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/generate-resume" className="btn btn-primary btn-lg px-8">
              Start Building Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl opacity-80">What our users say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body p-8">
                  <div className="flex items-center mb-6">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm opacity-70">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input key={i} type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have landed their dream jobs with AI Resume Maker
          </p>
          <Link to="/generate-resume" className="btn btn-secondary btn-lg px-10 text-white shadow-lg">
            Create Your Resume Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span> 
          <Link to="/" className="link link-hover hover:text-primary">Resume Builder</Link>
          <Link to="/services" className="link link-hover hover:text-primary">Cover Letters</Link>
          <Link to="/services" className="link link-hover hover:text-primary">ATS Checker</Link>
          <Link to="/services" className="link link-hover hover:text-primary">Career Coaching</Link>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <Link to="/about" className="link link-hover hover:text-primary">About us</Link>
          <Link to="/contact" className="link link-hover hover:text-primary">Contact</Link>
          <Link to="/" className="link link-hover hover:text-primary">Careers</Link>
          <Link to="/" className="link link-hover hover:text-primary">Blog</Link>
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <Link to="/" className="link link-hover hover:text-primary">Terms of use</Link>
          <Link to="/" className="link link-hover hover:text-primary">Privacy policy</Link>
          <Link to="/" className="link link-hover hover:text-primary">Cookie policy</Link>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-content">Subscribe for updates</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="your@email.com" 
                className="input input-bordered w-full pr-16 text-neutral" 
              />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright */}
      <footer className="footer px-10 py-4 bg-neutral border-t border-neutral-focus">
        <div className="items-center grid-flow-col">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"></path>
          </svg>
          <p>Copyright © 2023 AI Resume Maker. All rights reserved.</p>
        </div> 
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;