import React, { useEffect, useRef, useState, useCallback } from 'react';

const AnimatedSectionTitle = ({ title, height = '100vh', bg = '#7c0a1e' }) => {
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const [style, setStyle] = useState({ scale: 0.1, opacity: 0 });
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  // Throttled scroll handler for 60fps performance
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Skip if already scheduled

    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const container = titleContainerRef.current;
      
      if (section && container) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollPosition - lastScrollY.current) < 1) {
          rafRef.current = null;
          return;
        }
        
        lastScrollY.current = scrollPosition;
        
        const isInSection =
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight;
          
        if (isInSection) {
          const scrollProgress = Math.min(
            Math.max((scrollPosition - sectionTop) / (sectionHeight - windowHeight), 0),
            1
          );
          
          // Optimized calculations for smoother animation
          const newScale = 0.1 + scrollProgress * 0.9;
          const opacity = scrollProgress < 0.85 ? 1 : Math.max(0, 1 - (scrollProgress - 0.85) * 6.666);
          
          setStyle({ scale: newScale, opacity });
        } else {
          setStyle({ scale: 0.1, opacity: 0 });
        }
      }
      
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height,
        width: '100%',
      }}
    >
      <div
        ref={titleContainerRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: style.opacity,
          transition: 'opacity 0.1s',
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      >
        <span
          style={{
            fontSize: '7vw',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.1em',
            transform: `scale(${style.scale})`,
            opacity: style.opacity,
            transition: 'transform 0.05s, opacity 0.1s',
            willChange: 'transform, opacity',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            backfaceVisibility: 'hidden', // Optimize for GPU
            transformStyle: 'preserve-3d', // Force GPU layer
          }}
        >
          {title}
        </span>
      </div>
    </section>
  );
};

export default AnimatedSectionTitle; 