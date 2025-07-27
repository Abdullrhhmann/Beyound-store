import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '../assets/images/HEROIMAGE.webp';
import heroBgMobile from '../assets/images/heroimage-mobile.webp';
import logo from '../assets/logos/logo.webp';

const HeroSection = () => {
  const videoRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(heroBgMobile);

  useEffect(() => {
    // Set background image based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setBackgroundImage(heroBg);
      } else {
        setBackgroundImage(heroBgMobile);
      }
    };

    // Set initial background
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Parallax effect for video
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="section-container min-h-[101vh] bg-transparent relative overflow-hidden h-[calc(100vh-4rem)] p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100%\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.18\'/></svg>")',
          opacity: 0.18,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img 
            src={logo} 
            alt="BE-YOUnd Logo" 
            className="mx-auto max-w-md md:max-w-2xl lg:max-w-3xl w-full h-auto drop-shadow-xl"
            style={{ minHeight: '180px' }}
            width="380"
            height="285"
            srcSet={`${logo} 380w, ${logo} 800w`}
            sizes="(max-width: 768px) 380px, 800px"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          
        </motion.p>

        {/* Remove the buttons below */}
        {/* <motion.div ...> ... </motion.div> */}
      </div>

      {/* Scroll Indicator with Text */}
      <motion.div
        className="absolute bottom-1/4 sm:bottom-8 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <motion.span
            className="text-white text-xs md:text-sm font-semibold tracking-widest mb-2 uppercase select-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 