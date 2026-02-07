import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}>
              <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform group-hover:rotate-12 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-white">{APP_NAME}</span>
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="hidden md:block text-xs uppercase tracking-widest text-[#888888] hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="hidden md:block text-xs uppercase tracking-widest text-[#888888] hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Process
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="bg-cyan-500 text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-6 overflow-hidden"
      >
        {/* Animated Background Dots */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #22d3ee 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-10 md:space-y-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 border border-cyan-500/20 bg-cyan-500/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                <span>Easy Health Analysis</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white block">Understand</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block">Your Health</span>
                <span className="text-white/40 font-serif italic block">Better</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed max-w-lg font-light">
                Medical reports shouldn't be a mystery. Upload your lab results and get instant, simple explanations in plain language that anyone can understand.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <button
                  onClick={() => navigate('/analyze')}
                  className="bg-cyan-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Analyze Report
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 bg-white/5 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-all w-full sm:w-auto border border-white/5"
                >
                  How it works
                </button>
              </div>
            </div>

            {/* Right: Modern 3D Visuals */}
            <div className="relative hidden lg:block h-[600px] w-full perspective-[2000px]">
              {/* Main Report Card */}
              <div className="absolute top-10 right-10 w-[380px] bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 animate-float transition-transform hover:scale-105 duration-500 z-20 transform rotate-y-[-12deg] rotate-x-[5deg]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">Blood Report Analysis</h3>
                      <p className="text-gray-500 text-xs">Generated just now</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    Complete
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Hemoglobin</span>
                      <span className="text-white font-mono">14.2 g/dL</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[75%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">RBC Count</span>
                      <span className="text-white font-mono">5.1 mil/uL</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 mt-4">
                    <p className="text-gray-300 text-xs leading-relaxed">
                      <span className="text-cyan-400 font-bold">AI Insight:</span> All vitals are within normal range. No immediate attention required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Vitals Card */}
              <div className="absolute top-40 -left-10 w-64 bg-[#111] border border-white/10 rounded-xl p-5 shadow-xl animate-float-delayed z-10 transform rotate-y-[10deg] rotate-x-[5deg]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm font-bold tracking-wide">Heart Rate</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">72</span>
                  <span className="text-gray-500 text-xs mb-1">BPM</span>
                </div>
                <div className="mt-3 h-8 flex items-end gap-1">
                  {[40, 60, 45, 70, 50, 65, 55, 40].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="w-1.5 bg-red-500/40 rounded-t-sm"></div>
                  ))}
                </div>
              </div>

              {/* Floating Molecule/Icon Card */}
              <div className="absolute bottom-20 right-0 w-48 bg-cyan-900/10 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 animate-float-slow z-30 transform rotate-y-[-5deg]">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                  <div className="absolute inset-2 border-2 border-dashed border-cyan-400/30 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Simplifying</div>
              </div>

              {/* Connecting Lines (Decorative) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                <path d="M300 100 L 150 200" stroke="url(#lineGrid)" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M350 300 L 450 400" stroke="url(#lineGrid)" strokeWidth="1" strokeDasharray="5 5" />
                <defs>
                  <linearGradient id="lineGrid" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
            {[
              { value: '03', label: 'Languages' },
              { value: 'SEC', label: 'Processing' },
              { value: 'PDF', label: 'Support' },
              { value: 'SAFE', label: 'Private' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#888888] uppercase tracking-[0.3em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 border border-cyan-500/20 text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-500/5">
                Features
              </div>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Everything <br />You Need
              </h2>
            </div>
            <p className="text-[#888888] max-w-sm text-sm leading-relaxed">
              We make it simple to understand medical data without needing a doctor's degree.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Upload Any Format', desc: 'Working with PDF, JPG, and PNG medical reports.' },
              { title: 'Multiple Languages', desc: 'Choose between English, Hindi, and Hinglish explanations.' },
              { title: 'Super Fast', desc: 'Get your report summarized in just a few seconds.' },
              { title: 'Plain English', desc: 'No complex jargon. Just simple, clear language.' },
              { title: 'Privacy First', desc: 'We don\'t store your reports. Your data stays private.' }
            ].map((feature, idx) => (
              <div key={idx} className="glass-effect p-8 md:p-10 hover-lift h-full flex flex-col justify-between min-h-[220px] md:min-h-[250px]">
                <div className="text-cyan-500 opacity-20 font-mono text-xs">0{idx + 1}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-4">{feature.title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 border border-cyan-500/20 text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-500/5">
                  Process
                </div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">3 Simple <br />Steps</h2>
              </div>

              <div className="space-y-8 md:space-y-12">
                {[
                  { title: 'Upload Report', desc: 'Select your medical report from your device.' },
                  { title: 'Pick Language', desc: 'Choose how you want the explanation.' },
                  { title: 'Read Summary', desc: 'Get your easy-to-read medical results.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6 md:gap-8 group">
                    <div className="text-sm font-bold text-cyan-500 transition-transform group-hover:scale-110">0{idx + 1}</div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold uppercase tracking-tight group-hover:text-cyan-400 transition-colors text-white">{step.title}</h4>
                      <p className="text-[#888888] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative border border-white/5 p-4 bg-white/[0.02] hover:border-cyan-500/20 transition-colors group hidden md:block">
              <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
              <div className="relative border border-white/5 aspect-square flex items-center justify-center overflow-hidden">
                <div className="text-[120px] font-bold text-cyan-500/[0.03] absolute rotate-12 select-none group-hover:scale-110 transition-transform">HEALTH</div>
                <div className="w-3/4 aspect-square border-2 border-cyan-500/10 border-dashed animate-[spin_20s_linear_infinite] rounded-full"></div>
                <div className="w-1/2 aspect-square border border-cyan-500/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center border border-cyan-500/10 p-10 md:p-24 bg-cyan-500/[0.01] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="relative z-10 space-y-8 md:space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white">
              Ready to <br />Start?
            </h2>
            <button
              onClick={() => navigate('/analyze')}
              className="bg-cyan-500 text-black px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-widest hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] w-full md:w-auto"
            >
              Analyze Now →
            </button>
            <div className="flex justify-center gap-8 md:gap-12 text-[10px] text-[#444] uppercase tracking-widest font-bold">
              <span>Private</span>
              <span>Fast</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-white">{APP_NAME}</span>
            </div>
            <p className="text-[#888888] text-xs leading-loose italic">
              Making medical reports clear and accessible for everyone. Simple language for complex data.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full md:w-auto">
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-[#888888] font-bold">Links</div>
              <div className="flex flex-col gap-3 text-xs text-[#555] font-medium">
                <button onClick={() => scrollToSection('features')} className="text-left hover:text-cyan-400 transition-colors">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-left hover:text-cyan-400 transition-colors">Process</button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-[#888888] font-bold font-sans">Disclaimer</div>
              <p className="text-[#444444] text-[10px] uppercase leading-relaxed max-w-[160px]">
                For educational use only. Consult a doctor for medical advice.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-[#333] font-bold text-center md:text-left">
          &copy; {new Date().getFullYear()} {APP_NAME}. ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
