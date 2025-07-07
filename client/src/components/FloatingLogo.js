import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BU_LOGO from '../assets/logos/BU.png';

const FloatingLogo = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Fixed positions for logos
    const fixedPositions = [
      { x: -100, y: 100, side: 'left' },
      { x: window.innerWidth + 100, y: 300, side: 'right' },
      { x: -100, y: 500, side: 'left' },
      { x: window.innerWidth + 100, y: 700, side: 'right' },
      { x: -100, y: 900, side: 'left' },
    ];

    const createLogo = (position) => {
      const newLogo = {
        id: Date.now() + Math.random(),
        x: position.x,
        y: position.y,
        side: position.side,
        duration: 8 + Math.random() * 4, // 8-12 seconds
        delay: Math.random() * 3, // 0-3 seconds delay
      };

      setLogos(prev => [...prev, newLogo]);

      // Remove logo after animation
      setTimeout(() => {
        setLogos(prev => prev.filter(logo => logo.id !== newLogo.id));
      }, (newLogo.duration + newLogo.delay) * 1000);
    };

    // Create logos at fixed positions
    fixedPositions.forEach((position, index) => {
      setTimeout(() => {
        createLogo(position);
      }, index * 2000); // Stagger the appearance
    });

    // Repeat the cycle
    const interval = setInterval(() => {
      fixedPositions.forEach((position, index) => {
        setTimeout(() => {
          createLogo(position);
        }, index * 2000);
      });
    }, 15000); // Repeat every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {logos.map((logo) => (
          <motion.div
            key={logo.id}
            className="absolute"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: logo.duration,
              delay: logo.delay,
              ease: "easeInOut",
            }}
            style={{
              left: logo.x,
              top: logo.y,
              filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(0,0,0,0.4)) drop-shadow(0 8px 16px rgba(0,0,0,0.7))",
            }}
          >
            <img
              src={BU_LOGO}
              alt="BU Logo"
              className="w-32 sm:w-40 md:w-48 lg:w-56 opacity-80"
              style={{
                objectFit: 'contain',
                aspectRatio: '1.42', // 4960/3496 natural ratio
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                transform: `rotate(${Math.random() * 20 - 10}deg)`, // Slight random rotation
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLogo; 