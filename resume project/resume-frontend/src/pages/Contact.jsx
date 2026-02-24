import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="section-padding gradient-bg">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-base-content/80">
            Have questions? We're here to help! Reach out to our team anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="card p-8">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                {[
                  { icon: <FaEnvelope className="text-primary" />, text: "dhannumeena281229111@gmail.com" },
                  { icon: <FaPhone className="text-secondary" />, text: "7023988261" },
                  { icon: <FaMapMarkerAlt className="text-accent" />, text: "IIIT ALLAHABAD " }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <p className="text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-base-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="card p-8">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg mb-2" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg mb-2" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-lg mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-40"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 card p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the AI resume builder work?",
                answer: "Our AI analyzes your input to create a professionally formatted resume tailored to your industry and experience level."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use bank-level encryption and never share your information with third parties."
              },
              {
                question: "Can I customize the resume after it's generated?",
                answer: "Yes, you can fully edit every section of your resume after it's generated."
              },
              {
                question: "Do you offer ATS optimization?",
                answer: "All our resumes are optimized to pass through Applicant Tracking Systems used by most companies."
              }
            ].map((faq, index) => (
              <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content"> 
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;