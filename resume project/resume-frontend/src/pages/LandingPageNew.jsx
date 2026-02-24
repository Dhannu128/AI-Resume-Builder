import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBrain, FaRocket, FaCheckCircle, FaStar, FaUsers, FaChartLine, 
  FaFileAlt, FaDownload, FaMagic, FaShieldAlt, FaGlobe, FaClock, FaLightbulb 
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

const LandingPageNew = () => {
  const features = [
    {
      icon: <FaBrain className="text-5xl" />,
      title: "AI-Powered Intelligence",
      description: "Advanced AI analyzes your experience and creates tailored, impactful content that stands out",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaRocket className="text-5xl" />,
      title: "Lightning Fast",
      description: "Generate professional resumes in under 30 seconds - no more hours of formatting",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaCheckCircle className="text-5xl" />,
      title: "ATS Optimized",
      description: "Beat applicant tracking systems with resumes optimized for keyword matching",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaMagic className="text-5xl" />,
      title: "Smart Formatting",
      description: "Beautiful, professional layouts that recruiters love - automatically formatted",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaLightbulb className="text-5xl" />,
      title: "Interview Prep",
      description: "Company-specific interview questions for Google, Amazon, Microsoft & more",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaShieldAlt className="text-5xl" />,
      title: "Privacy First",
      description: "Your data stays private - no storage, no tracking, just results",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FaGlobe className="text-5xl" />,
      title: "Global Ready",
      description: "Works for any industry, any role, anywhere in the world",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { number: "100K+", label: "Resumes Created", icon: <FaFileAlt /> },
    { number: "95%", label: "Success Rate", icon: <FaChartLine /> },
    { number: "10K+", label: "Happy Users", icon: <FaUsers /> },
    { number: "4.9/5", label: "User Rating", icon: <FaStar /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "This AI tool helped me land my dream job at Google! The resume was so professional and perfectly highlighted my skills."
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Amazon",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "I was skeptical at first, but the AI generated a better resume than I could have written myself. Got 3 interviews in the first week!"
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist at Microsoft",
      avatar: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      text: "As someone who hates writing about themselves, this tool was a lifesaver. The AI captured my experience perfectly."
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Share Your Story",
      description: "Tell us about your education, experience, and achievements in simple words",
      icon: <HiSparkles className="text-4xl" />
    },
    {
      step: "02",
      title: "AI Magic Happens",
      description: "Our advanced AI processes your information and crafts compelling content",
      icon: <FaBrain className="text-4xl" />
    },
    {
      step: "03",
      title: "Get Your Resume",
      description: "Download your professionally formatted, ATS-optimized resume instantly",
      icon: <FaDownload className="text-4xl" />
    },
    {
      step: "04",
      title: "Land Interviews",
      description: "Apply with confidence and watch the interview invitations roll in",
      icon: <HiLightningBolt className="text-4xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 -bottom-48 left-1/2 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg">
                  ✨ AI-Powered Resume Builder
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Create Your
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Dream Resume
                </span>
                in 30 Seconds
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                Let AI transform your career story into a professional, ATS-optimized resume that gets you hired faster
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/create-resume" 
                  className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:shadow-2xl hover:scale-105 transform transition-all duration-300 px-8"
                >
                  <FaRocket className="mr-2" />
                  Create Resume Now - Free
                </Link>
                <Link 
                  to="/interview-prep" 
                  className="btn btn-lg btn-outline border-2 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all duration-300"
                >
                  <FaBrain className="mr-2" />
                  Interview Prep
                </Link>
              </div>

              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="avatar placeholder border-4 border-white rounded-full">
                      <div className="w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                        <span className="text-white text-xs">👤</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <FaStar key={i} />)}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Loved by 100K+ users</p>
                </div>
              </div>
            </div>

            {/* Right Content - Mockup */}
            <div className="relative animate-fade-in-right hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative mockup-window border-2 border-purple-200 bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="p-8 bg-gradient-to-br from-white to-purple-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    <div className="pt-4 space-y-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></div>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded mb-1"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-bounce">
                ATS Score: 98%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl mb-2 opacity-80">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Resume Maker?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of resume creation with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">How It Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to your perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-4xl text-purple-300 z-10">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/generate-resume" 
              className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:shadow-2xl hover:scale-105 transform transition-all duration-300 px-10"
            >
              Start Creating Your Resume Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold">
              Success <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-gray-600">What our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} className="text-xl" />)}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-4 border-purple-200"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden px-4">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob top-0 left-0"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000 bottom-0 right-0"></div>
        </div>
        <div className="container mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-2xl opacity-90 max-w-3xl mx-auto">
            Join 100,000+ professionals who have transformed their careers with AI Resume Maker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              to="/generate-resume" 
              className="btn btn-lg bg-white text-purple-600 border-none hover:bg-gray-100 shadow-2xl hover:scale-105 transform transition-all duration-300 px-10"
            >
              <FaRocket className="mr-2" />
              Get Started Free
            </Link>
            <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300">
              <FaClock className="mr-2" />
              Watch Demo (2 min)
            </button>
          </div>
          <p className="text-sm opacity-75 pt-4">✨ No credit card required • ⚡ Create unlimited resumes • 🔒 100% Private</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Resume Maker
              </h3>
              <p className="text-sm leading-relaxed">
                Empowering professionals worldwide with AI-powered resume creation technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/generate-resume" className="hover:text-purple-400 transition-colors">Resume Builder</Link></li>
                <li><Link to="/interview-prep" className="hover:text-purple-400 transition-colors">Interview Prep</Link></li>
                <li><Link to="/services" className="hover:text-purple-400 transition-colors">Services</Link></li>
                <li><Link to="/api-test" className="hover:text-purple-400 transition-colors">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 AI Resume Maker. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.3s backwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPageNew;
