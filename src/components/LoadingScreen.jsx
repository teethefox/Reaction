import React from 'react';
import './LoadingScreen.css';
import Logo from '../assets/LogoIcon.png'; // Your logo path

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <img src={Logo} alt="Loading" className="loading-logo" />
    </div>
  );
};

export default LoadingScreen;
