import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const FeaturedFlavorSection = ({
  title = 'Blueberry Surge: Give Your Mind a Boost',
  tagline = 'Featured Flavor',
  buttonText = 'Shop Now',
  buttonLink = '/shop/blueberry-surge',
  videoUrl,
  flavorImage,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-[1.2] z-0"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Flavor Image (floating can) */}
      {flavorImage && (
        <motion.img
          src={flavorImage}
          alt="Flavor Can"
          className="absolute bottom-12 left-12 w-32 sm:w-40 md:w-48 z-20 drop-shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}

      {/* Text Block */}
      <motion.div
        className="relative z-20 max-w-xl ml-auto text-right mt-[20%] px-6"
        initial={{ opacity: 0, x: 100 }}
        animate={controls}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-white text-4xl font-bold mb-4 leading-tight">{title}</h2>
        <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-6">
          {tagline}
        </p>
        <a
          href={buttonLink}
          className="inline-block bg-white text-black px-6 py-3 font-bold rounded-full hover:bg-blue-100 transition"
        >
          {buttonText}
        </a>
      </motion.div>
    </div>
  );
};

export default FeaturedFlavorSection;
