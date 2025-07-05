import React, { useEffect, useRef, useState } from 'react';

const ScrollingLogoSection = () => {
  const sectionRef = useRef(null);
  const logoContainerRef = useRef(null);
  const [style, setStyle] = useState({ scale: 0.1, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const logoSection = sectionRef.current;
      const logoContainer = logoContainerRef.current;
      if (logoSection && logoContainer) {
        const sectionTop = logoSection.offsetTop;
        const sectionHeight = logoSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const isInSection =
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight;
        if (isInSection) {
          // Calculate scroll progress within the section
          const scrollProgress = Math.min(
            Math.max((scrollPosition - sectionTop) / (sectionHeight - windowHeight), 0),
            1
          );
          // Scale text from 0.1 to 1
          const newScale = 0.1 + scrollProgress * 0.9;
          // Fade out text near the end of section
          const opacity = scrollProgress < 0.85 ? 1 : 1 - (scrollProgress - 0.85) * 6.666;
          setStyle({ scale: newScale, opacity });
        } else {
          setStyle({ scale: 0.1, opacity: 0 });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scrolling-logo-section"
      style={{
        position: 'relative',
        height: '300vh',
        width: '100%',
        background: '#7c0a1e',
      }}
    >
      <div
        ref={logoContainerRef}
        className="logo-container"
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
          transition: 'opacity 0.2s ease-out',
          pointerEvents: 'none',
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
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
            willChange: 'transform, opacity',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          ABOUT US
        </span>
      </div>
    </section>
  );
};

export default ScrollingLogoSection; 