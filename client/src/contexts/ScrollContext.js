import React, { createContext, useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Initialize smooth scrolling
    const sections = document.querySelectorAll('.section-container');
    
    // Define color zones based on scroll percentage - White theme
    const colorZones = [
      { percentage: 0, color: '#ffffff' },    // 0% - White (Hero)
      { percentage: 15, color: '#f8fafc' },   // 15% - Light gray (About)
      { percentage: 30, color: '#fef3c7' },   // 30% - Light yellow (Product 1)
      { percentage: 45, color: '#dbeafe' },   // 45% - Light blue (Product 2)
      { percentage: 60, color: '#dcfce7' },   // 60% - Light green (Product 3)
      { percentage: 75, color: '#f8fafc' },   // 75% - Light gray (Testimonials)
      { percentage: 90, color: '#ffffff' }    // 90% - White (Footer)
    ];

    // Function to get color based on scroll percentage
    const getColorForScrollPercentage = (percentage) => {
      for (let i = colorZones.length - 1; i >= 0; i--) {
        if (percentage >= colorZones[i].percentage) {
          return colorZones[i].color;
        }
      }
      return colorZones[0].color;
    };

    // Function to update background color based on scroll
    const updateBackgroundColor = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      
      const newColor = getColorForScrollPercentage(scrollPercentage);
      
      gsap.to(document.body, {
        backgroundColor: newColor,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    // Add scroll event listener for percentage-based color changes
    window.addEventListener('scroll', updateBackgroundColor);

    // Create scroll triggers for each section (for section detection)
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentSection(index);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 1000);
        },
        onEnterBack: () => {
          setCurrentSection(index);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 1000);
        },
      });
    });

    // Smooth scroll to section
    const scrollToSection = (sectionIndex) => {
      let targetSection = sections[sectionIndex];
      // Fallback: if index is out of bounds, scroll to last section
      if (!targetSection && sections.length > 0) {
        targetSection = sections[sections.length - 1];
      }
      if (targetSection) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: targetSection, offsetY: 0 },
          ease: 'power2.inOut',
        });
      }
    };

    // Expose scroll function globally
    window.scrollToSection = scrollToSection;

    // Initial color update
    updateBackgroundColor();

    return () => {
      window.removeEventListener('scroll', updateBackgroundColor);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const value = {
    currentSection,
    isScrolling,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}; 