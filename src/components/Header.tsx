import React from 'react';
import { APP_NAME, DISCLAIMER_TEXT } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-lg">
              EM
            </div>
            <h1 className="text-lg font-semibold text-white">{APP_NAME}</h1>
          </div>
          <div className="glass-effect border border-white/10 rounded-lg p-3 max-w-2xl">
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              <span className="font-semibold text-white">Notice:</span> {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
