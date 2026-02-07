import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MainService from './components/MainService';

const App: React.FC = () => {
  const [showMainService, setShowMainService] = useState<boolean>(false);

  const handleGetStarted = () => {
    setShowMainService(true);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (showMainService) {
    return <MainService />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default App;

