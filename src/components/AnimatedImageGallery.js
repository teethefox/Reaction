import React, { useEffect, useRef } from 'react';
import AnimatedImagePair from './AnimatedImagePair';

const AnimatedImageGallery = () => {
  const containerRef = useRef(null);



  return (
    <section className="animated-scroll-wrapper" ref={containerRef}>
      <div className="animated-scroll-track">
        {/* <AnimatedImagePair index={0} />
        <AnimatedImagePair index={1} /> */}
        <AnimatedImagePair index={2} />
      </div>
    </section>
  );
};

export default AnimatedImageGallery;
