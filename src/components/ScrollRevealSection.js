// src/components/ScrollRevealSection.js
import React from 'react';
import { motion } from 'framer-motion';

const ScrollRevealSection = ({ children, direction = 'up' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: 'easeOut' }}
      variants={variants}
      viewport={{ once: true, amount: 0.3 }}
      className="px-8 py-12"
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
