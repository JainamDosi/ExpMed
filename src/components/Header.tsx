import React from 'react';
import { APP_NAME, DISCLAIMER_TEXT } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center font-bold text-black text-xs transition-transform group-hover:rotate-12">
              SR
            </div>
            <h1 className="text-sm font-bold tracking-tight text-white">{APP_NAME}</h1>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-3 max-w-xl">
            <p className="text-[10px] text-[#555] leading-relaxed uppercase tracking-widest font-bold">
              <span className="text-cyan-500/50">Note:</span> {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
