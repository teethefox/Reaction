import React from 'react';
import heroVideo from '../assets/hero.mp4';

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        {/* Your browser does not support the video tag. */}
      </video>

      <div className="hero-content">
        <h1>Reaction Energy</h1>
        <p>Drink. Win. Repeat.</p>
      </div>
    </section>
  );
};

export default HeroSection;
