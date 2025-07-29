import React, { useEffect, useRef } from 'react';
import AnimatedImagePair from './AnimatedImagePair';

const AnimatedImageGallery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom > window.innerHeight / 2;

      if (isInView && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

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
