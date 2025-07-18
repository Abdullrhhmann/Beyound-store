import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total animation time: 3 seconds (1.5s per circle)
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* blue Circle - First */}
          <motion.div
            className="absolute w-4 h-4 rounded-full"
            style={{ backgroundColor: '#150958' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 200,
              opacity: [1, 1, 1, 0]
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.1, 0.8, 1]
            }}
          />
          
          {/* burgandy Circle - Second */}
          <motion.div
            className="absolute w-4 h-4 rounded-full"
            style={{ backgroundColor: '#8b001d' }}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ 
              scale: 200,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.1, 0.8, 1],
              delay: 1
            }}
          />

          {/* Fixed Text in Center */}
          <div className="absolute z-10 text-center px-2 w-full">
            {/* First Text */}
            <AnimatePresence>
              <motion.h1
                key="text1"
                className="text-white mb-4 sm:mb-8"
                style={{ 
                  fontFamily: "Fredoka One, cursive",
                  fontWeight: "900",
                  fontSize: "clamp(2.875rem, 6vw, 4.75rem)",
                  letterSpacing: "0.15em",
                  lineHeight: "1.2",
                  textAlign: "center"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ 
                  duration: 1,
                  ease: "easeOut",
                  delay: 0
                }}
              >
                IT'S A MARATHON
              </motion.h1>
            </AnimatePresence>

            {/* Second Text */}
            <AnimatePresence>
              <motion.h1
                key="text2"
                className="text-white"
                style={{ 
                  fontFamily: "Fredoka One, cursive",
                  fontWeight: "900",
                  fontSize: "clamp(2.875rem, 6vw, 4.75rem)",
                 
                  letterSpacing: "0.15em",
                  lineHeight: "1.2",
                  textAlign: "center"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ 
                  duration: 1,
                  ease: "easeOut",
                  delay: 1.3
                }}
              >
                NOT A SPRINT
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 