import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import P1 from '../assets/P1_Arm.png';
import P2 from '../assets/P2_Arm1.png';
import P3 from '../assets/P3_Arm.png';
import BG1 from '../assets/P1_BAckground.png';
import BG2 from '../assets/P2_Background.png';
import BG3 from '../assets/P3_background.png';
import './AnimatedImagePair.css';

const textStyle= { fontSize: '5rem', fontWeight: '900', textShadow: '#fff 1px 0 10px' }
const imagePairs = [
  {
    background: BG1,
    foreground: P1,
    text: (
      <>
        A <span className='highlight-word'>groundbreaking</span> <span className='highlight-word'> functional </span> <span className='highlight-word'> performance </span>  formula
      </>
    ),
  },
  {
    background: BG2,
    foreground: P2,
    text: (
      <>
        <span className='highlight-word'>Clean, long-lasting energy</span><br />
        <span className='highlight-word'>enhanced</span> cognitive performance, and <span className='highlight-word'>optimized</span> recovery.
      </>
    ),
  },
  {
    background: BG3,
    foreground: P3,
    text: (
      <>
        A <span className='highlight-word'> scientifically backed</span> alternative for 
         <span className='highlight-word'>  athletes</span>, <span className='highlight-word'> professionals</span>, and <span className='highlight-word'> health-conscious</span> consumers <br />
        <span className='highlight-word'>- Dr. Indigo Vasquez</span>
      </>
    ),
  },
];


const AnimatedImagePair = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const preloadImages = () => {
      imagePairs.forEach(pair => {
        const bg = new Image();
        bg.src = pair.background;
        const fg = new Image();
        fg.src = pair.foreground;
      });
    };

    preloadImages();

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % imagePairs.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const { background, foreground, text } = imagePairs[index];

    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'right',
          position: 'relative'
        }}
      >
         <AnimatePresence mode="wait">
          <motion.img
            key={foreground}
            src={foreground}
            alt="Foreground"
            className="z-10 object-contain foreground-style"
            animate={{ scale: [2, 2.02, 2], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.img
            key={background}
            src={background}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 background-style"
            animate={{ scale: [2, 2.02, 2], rotate: [0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </AnimatePresence> 
        <AnimatePresence mode="wait">
  <div
  className='centered-text'>
    {text}
  </div>
</AnimatePresence>


        <AnimatePresence mode="wait">
          <motion.img
            key={foreground}
            src={foreground}
            alt="Foreground"
            className="z-10 object-contain foreground-style-small background-style-small"
            animate={{ scale: [1, 1.02, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.img
            key={background}
            src={background}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 background-style-small"
            animate={{ scale: [1, 1.02, 1], rotate: [0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </AnimatePresence>

       
   
      </div>
    
  );
};

export default AnimatedImagePair;
