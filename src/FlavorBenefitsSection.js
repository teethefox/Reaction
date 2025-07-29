import React from 'react';
import PromoVideo from './assets/repeatvideogreen.MOV'; // Right-side lifestyle photo
import IconsImage from './assets/nutritionfacts.png'; // New combined icon image
import './FlavorBenefitsSection.css';


const FlavorBenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="benefits-container">
        
        {/* Left: Icons image */}
        <div className="benefits-left">
          <img
            src={IconsImage}
            alt="Nutrition Benefits"
            className="benefits-image"
          />
        </div>

        {/* Right: Promo video */}
        <div className="benefits-right">
          <video
            src={PromoVideo}
            autoPlay
            muted
            loop
            playsInline
            className="benefits-video"
          />
        </div>
      </div>
    </section>
  );
};

export default FlavorBenefitsSection;
