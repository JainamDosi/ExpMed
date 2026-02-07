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
              <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center font-bold text-black text-sm transition-transform group-hover:rotate-12">
                SR
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
                className="accent-button bg-cyan-500 text-black px-4 md:px-6 py-2 rounded-sm font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all"
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
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Animated Background Dots */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #22d3ee 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 border border-cyan-500/20 bg-cyan-500/5 rounded-none text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                <div className="dot-pulse"></div>
                <span>Easy Health Analysis</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase">
                <span className="text-white">Understand</span>
                <br />
                <span className="gradient-text">Your Health</span>
                <br />
                <span className="text-white/20 italic">Better</span>
              </h1>

              <p className="text-lg text-[#888888] leading-relaxed max-w-md font-light">
                Getting medical reports is easy, understanding them shouldn't be hard. Upload your lab reports and get clear, simple explanations instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/analyze')}
                  className="accent-button bg-cyan-500 text-black px-10 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  Analyze Report →
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-10 py-4 border border-white/10 text-white rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  How it works
                </button>
              </div>
            </div>

            {/* Right: Modern Visuals */}
            <div className="relative hidden lg:block h-[500px]">
              <div className="absolute top-0 right-0 w-[400px] h-[500px] border border-cyan-500/10 glass-effect p-8 flex flex-col justify-between hover-lift">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-cyan-500/50">Status: Ready</div>
                      <div className="text-xl font-bold uppercase tracking-tight">Report Preview</div>
                    </div>
                    <div className="w-10 h-10 border border-cyan-500/20 flex items-center justify-center">
                      <div className="dot-pulse"></div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-px bg-white/5 w-full"></div>
                    ))}
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-[#888888]">Hemoglobin</span>
                        <span className="text-cyan-400">14.2 g/dL</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/5 overflow-hidden">
                        <div className="w-[70%] h-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-[#888888]">Glucose</span>
                        <span className="text-cyan-400">95 mg/dL</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/5 overflow-hidden">
                        <div className="w-[45%] h-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest text-[#333] font-mono">
                  SWASTHYA_HELPER v1.0
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-white/10 bg-white/5 backdrop-blur-3xl p-8 flex flex-col justify-end animate-float">
                <div className="text-4xl font-bold text-cyan-400 mb-2 italic">FREE</div>
                <div className="text-[10px] uppercase tracking-widest text-[#888888]">No Sign up Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { value: '03', label: 'Languages' },
              { value: 'SEC', label: 'Processing' },
              { value: 'PDF', label: 'Support' },
              { value: 'SAFE', label: 'Private' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 group cursor-default">
                <div className="text-4xl font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors">
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
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
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
              <div key={idx} className="glass-effect p-10 hover-lift h-full flex flex-col justify-between min-h-[250px]">
                <div className="text-cyan-500 opacity-20 font-mono text-xs">0{idx + 1}</div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">{feature.title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 border border-cyan-500/20 text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-500/5">
                  Process
                </div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">3 Simple <br />Steps</h2>
              </div>

              <div className="space-y-12">
                {[
                  { title: 'Upload Report', desc: 'Select your medical report from your device.' },
                  { title: 'Pick Language', desc: 'Choose how you want the explanation.' },
                  { title: 'Read Summary', desc: 'Get your easy-to-read medical results.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="text-sm font-bold text-cyan-500 transition-transform group-hover:scale-110">0{idx + 1}</div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold uppercase tracking-tight group-hover:text-cyan-400 transition-colors text-white">{step.title}</h4>
                      <p className="text-[#888888] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative border border-white/5 p-4 bg-white/[0.02] hover:border-cyan-500/20 transition-colors group">
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
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center border border-cyan-500/10 p-16 md:p-24 bg-cyan-500/[0.01] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
              Ready to <br />Start?
            </h2>
            <button
              onClick={() => navigate('/analyze')}
              className="accent-button bg-cyan-500 text-black px-12 py-6 rounded-sm font-bold text-base uppercase tracking-[0.2em] transform transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              Analyze Now →
            </button>
            <div className="flex justify-center gap-12 text-[10px] text-[#444] uppercase tracking-widest font-bold">
              <span>Private</span>
              <span>Fast</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center font-bold text-black text-xs">
                SR
              </div>
              <span className="text-sm font-bold tracking-tight text-white">{APP_NAME}</span>
            </div>
            <p className="text-[#888888] text-xs leading-loose italic">
              Making medical reports clear and accessible for everyone. Simple language for complex data.
            </p>
          </div>

          <div className="flex gap-20">
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
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-[#333] font-bold">
          &copy; {new Date().getFullYear()} {APP_NAME}. ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
