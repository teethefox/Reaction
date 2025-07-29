import React from 'react';

const ParallaxBanner = () => {
  return (
    <div
      className="relative h-[400px] overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
        <h2 className="text-4xl lg:text-6xl font-bold">Reaction Energy</h2>
      </div>
    </div>
  );
};

export default ParallaxBanner;
