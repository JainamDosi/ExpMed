import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './components/LandingPage';
import MainService from './components/MainService';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<MainService />} />
      </Routes>
      <Analytics />
    </>
  );
};

export default App;
