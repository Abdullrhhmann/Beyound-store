import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, Package, Users, Phone, Settings, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/BU.png';
import enactusLogo from '../assets/logos/Enactus-logo-black.png';

const Navigation = () => {
  const { totalItems, setCartOpen, addTrigger } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartVibrating, setIsCartVibrating] = useState(false);

  // Hero section in view detection
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    // Find the hero section by id
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0.5] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart vibration animation when items are added
  useEffect(() => {
    if (addTrigger > 0) {
      setIsCartVibrating(true);
      const timer = setTimeout(() => setIsCartVibrating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [addTrigger]);

  const scrollToSection = (sectionId) => {
    console.log('Attempting to scroll to section:', sectionId);
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        console.log('Element found, scrolling to:', el);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log('Element not found for section:', sectionId);
        // Fallback: scroll to bottom of page
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', section: 'hero', icon: Home },
    { name: 'Products', section: 'products', icon: Package },
    { name: 'About', section: 'about', icon: Users },
    { name: 'Testimonials', section: 'testimonials', icon: Star },
    { name: 'Contact', section: 'footer', icon: Phone },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 shadow-lg backdrop-blur-md' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* BU x Enactus logos in navbar (only when hero in view) */}
            <AnimatePresence>
              {heroInView && (
                <motion.div
                  className="flex-shrink-0 flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={logo} alt="Beyound Logo" className="h-8 sm:h-12 w-auto" style={{ objectFit: 'contain', aspectRatio: '1.42' }} />
                  <span 
                    className="mx-0 select-none"
                    style={{
                      color: '#fff', // white
                      fontWeight: 700,
                      fontSize: '2rem',
                      letterSpacing: '0.03em',
                      lineHeight: 1
                    }}
                  >
                    x
                  </span>
                  <img src={enactusLogo} alt="Enactus Logo" className="h-10 w-auto sm:h-16 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0px_32px_rgba(255,255,255,0.8)] drop-shadow-[0_2px_48px_rgba(0,0,0,0.95)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 sm:space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 text-white hover:bg-white/20"
                  onClick={() => scrollToSection(item.section)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Admin Button */}
            <Link to="/admin">
              <motion.button
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 text-white hover:bg-white/20 mr-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </motion.button>
            </Link>

            {/* Cart Button */}
            <motion.div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isCartVibrating ? {
                x: [0, -3, 3, -3, 3, 0],
                rotate: [0, -2, 2, -2, 2, 0]
              } : {}}
              transition={isCartVibrating ? {
                duration: 0.6,
                ease: "easeInOut"
              } : {}}
            >
              <ShoppingCart className="h-8 w-8 text-white" />
              {totalItems > 0 && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {totalItems}
                </motion.div>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                className="p-3 rounded-md text-white hover:bg-white/20 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-4 right-4 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl w-auto mx-auto"
              initial={{ y: -50, opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, scale: 0.8, rotateX: -15 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left hover:bg-white/20 transition-all duration-200 text-white font-medium"
                    onClick={() => scrollToSection(item.section)}
                    initial={{ x: -30, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      x: 8, 
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ rotate: -10, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: index * 0.08 + 0.1, duration: 0.3 }}
                    >
                      <item.icon className="h-5 w-5 text-white/80" />
                    </motion.div>
                    <span className="font-medium text-white">{item.name}</span>
                  </motion.button>
                ))}
                
                {/* Mobile Cart Button */}
                <motion.button
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left hover:bg-white/20 transition-all duration-200 text-white font-medium"
                  onClick={() => {
                    setCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ x: -30, opacity: 0, scale: 0.9 }}
                  animate={isCartVibrating ? {
                    x: [0, -3, 3, -3, 3, 0],
                    rotate: [0, -2, 2, -2, 2, 0]
                  } : { x: 0, opacity: 1, scale: 1 }}
                  transition={isCartVibrating ? {
                    duration: 0.6,
                    ease: "easeInOut"
                  } : { 
                    delay: navItems.length * 0.08,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    x: 8, 
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.08 + 0.1, duration: 0.3 }}
                  >
                    <ShoppingCart className="h-5 w-5 text-white/80" />
                  </motion.div>
                  <span className="font-medium text-white">
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated BU x Enactus logos at bottom left (only when hero NOT in view) */}
      <AnimatePresence>
        {!heroInView && (
          <motion.div
            className="fixed bottom-2 left-2 z-50 flex items-center bg-transparent select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
          >
            <div className="backdrop-blur-md shadow-[32px_12px_96px_32px_rgba(0,0,0,1)] -z-10" />
            <img src={logo} alt="Beyound Logo" className="h-10 w-auto sm:h-16" />
            <span 
              className="mx-0 select-none"
              style={{
                color: '#fff', // white
                fontWeight: 700,
                fontSize: '2.5rem',
                letterSpacing: '0.03em',
                lineHeight: 1
              }}
            >
              x
            </span>
            <img src={enactusLogo} alt="Enactus Logo" className="h-12 w-auto sm:h-20 drop-shadow-[0_12px_48px_rgba(0,0,0,1)] drop-shadow-[0_0px_48px_rgba(255,255,255,0.9)] drop-shadow-[0_4px_64px_rgba(0,0,0,1)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 