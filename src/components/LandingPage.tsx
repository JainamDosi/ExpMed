import React, { useState, useEffect, useRef } from 'react';
import { APP_NAME } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-lg">
                EM
              </div>
              <span className="text-lg font-semibold text-white">{APP_NAME}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-[#888888] hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-[#888888] hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('stats')}
                className="text-[#888888] hover:text-green-400 transition-colors duration-200 text-sm font-medium"
              >
                Stats
              </button>
              <button
                onClick={onGetStarted}
                className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
            <button
              onClick={onGetStarted}
              className="md:hidden bg-white text-black px-4 py-2 rounded-lg font-semibold text-xs hover:bg-gray-200 shadow-lg"
            >
              Start
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Cards */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03) 0%, transparent 50%)`
        }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-block px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-xs text-white font-medium backdrop-blur-xl">
                Medical Report Analyzer
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">Decode</span>
                <br />
                <span className="gradient-text">Your Reports</span>
                <br />
                <span className="text-[#a0a0a0]">Instantly</span>
              </h1>

              <p className="text-xl text-[#888888] leading-relaxed max-w-xl font-light">
                Transform complex medical terminology into clear, understandable language.
                Upload your lab reports and get instant explanations in English, Hindi, or Hinglish.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-base overflow-hidden hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Analyze Now →
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-lg font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-xl"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-xs text-[#a0a0a0]">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-xs text-[#a0a0a0]">No Sign Up</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-xs text-[#a0a0a0]">Instant Results</span>
                </div>
              </div>
            </div>

            {/* Right: 3D Medical Report Cards */}
            <div className="relative h-[600px] lg:h-[700px]">
              {/* Card 1 - Front */}
              <div
                className="absolute top-0 left-0 w-64 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 p-6 card-3d animate-float shadow-2xl"
                style={{ transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg)' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white font-medium">Lab Report</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded w-3/4"></div>
                    <div className="h-2 bg-white/10 rounded w-1/2"></div>
                    <div className="h-2 bg-white/10 rounded w-5/6"></div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-xs text-[#888888]">Glucose: 95 mg/dL</div>
                    <div className="text-xs text-[#888888]">Hemoglobin: 14.2 g/dL</div>
                    <div className="text-xs text-white">✓ All Normal</div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Middle */}
              <div
                className="absolute top-20 right-0 w-64 h-80 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/20 p-6 card-3d animate-float-delayed shadow-2xl backdrop-blur-xl"
                style={{ transform: 'perspective(1000px) rotateY(10deg) rotateX(-5deg)' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white font-medium">Prescription</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded w-4/5"></div>
                    <div className="h-2 bg-white/10 rounded w-2/3"></div>
                    <div className="h-2 bg-white/10 rounded w-full"></div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-xs text-[#888888]">Medication 1</div>
                    <div className="text-xs text-[#888888]">Dosage: 2x daily</div>
                    <div className="text-xs text-white">→ Analyzing</div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Back */}
              <div
                className="absolute bottom-0 left-1/4 w-64 h-80 bg-gradient-to-br from-slate-900 to-black rounded-xl border border-white/5 p-6 card-3d animate-float-delayed-2 shadow-2xl"
                style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(15deg)' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-xs text-white font-medium">Explained</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/10 rounded w-full"></div>
                    <div className="h-2 bg-white/10 rounded w-3/4"></div>
                    <div className="h-2 bg-white/10 rounded w-5/6"></div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-xs text-white">✓ Clear Explanation</div>
                    <div className="text-xs text-[#a0a0a0]">Plain Language</div>
                    <div className="text-xs text-white">Ready to View</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[

              { value: '3', label: 'Languages' },
              { value: '24/7', label: 'Available' },
              { value: '100%', label: 'Free' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center space-y-2 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl md:text-6xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-[#888888] uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-xs text-white font-medium backdrop-blur-xl">
              Features
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-[#888888] max-w-2xl mx-auto font-light">
              Everything you need to understand your medical reports with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="lg:col-span-2 glass-effect rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Multi-Format Support</h3>
              <p className="text-[#888888] leading-relaxed font-light">
                Upload images (JPG, PNG) or PDF files. Our AI extracts and analyzes all information automatically with precision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-effect rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Language</h3>
              <p className="text-[#888888] leading-relaxed font-light">
                Get explanations in English, Hindi (हिंदी), or Hinglish. Choose your preferred language.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-effect rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
              <p className="text-[#888888] leading-relaxed font-light">
                Get detailed explanations in seconds. Fast, accurate results with no delays.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-effect rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Plain Language</h3>
              <p className="text-[#888888] leading-relaxed font-light">
                Complex medical terms explained simply. No medical degree required.
              </p>
            </div>

            {/* Feature 5 - Large */}
            <div className="lg:col-span-2 glass-effect rounded-xl p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Privacy & Security</h3>
              <p className="text-[#888888] leading-relaxed font-light">
                Your medical reports are processed securely. We don't store your data permanently, and your privacy is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-xs text-white font-medium backdrop-blur-xl">
              Process
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-xl text-[#888888] max-w-2xl mx-auto font-light">
              Three simple steps to understand your medical reports
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Upload', desc: 'Upload an image or PDF of your medical report. Our system accepts JPG, PNG, and PDF formats.' },
              { num: '02', title: 'Select Language', desc: 'Choose your preferred language - English, Hindi, or Hinglish. The explanation will be tailored to your choice.' },
              { num: '03', title: 'Get Explanation', desc: 'Receive a detailed, easy-to-understand explanation with all medical terms explained in plain language.' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-xl p-8 text-center hover:border-white/40 transition-all duration-300 group"
              >
                <div className="inline-block w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-6 text-2xl font-bold text-black group-hover:scale-110 transition-transform shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#888888] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-effect rounded-2xl p-12 md:p-16 text-center border-2 border-white/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Start?
              </h2>
              <p className="text-xl text-[#888888] max-w-2xl mx-auto font-light">
                Join thousands of users who have gained clarity about their health reports. Start analyzing in seconds.
              </p>
              <button
                onClick={onGetStarted}
                className="px-10 py-5 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Get Started Now →
              </button>
              <p className="text-[#888888] text-sm">
                No credit card • No sign up • Instant results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-lg">
                  EM
                </div>
                <span className="text-lg font-bold text-white">{APP_NAME}</span>
              </div>
              <p className="text-[#888888] text-sm font-light">
                Making medical reports understandable for everyone, in the language they prefer.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('features')} className="text-[#888888] hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-[#888888] hover:text-white transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={onGetStarted} className="text-[#888888] hover:text-green-400 transition-colors">
                    Get Started
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Important Notice</h4>
              <p className="text-[#888888] text-xs leading-relaxed font-light">
                This tool is for educational purposes only. It is NOT a medical diagnosis or a substitute for professional medical advice. Always consult a qualified healthcare provider.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-[#888888]">
            <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
