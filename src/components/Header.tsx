import React from 'react';
import { APP_NAME, DISCLAIMER_TEXT } from '../constants';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              SR
            </div>
            <h1 className="text-sm font-semibold text-white">{APP_NAME}</h1>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-2 max-w-xl">
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              <span className="text-cyan-500 font-semibold">Note:</span> {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
