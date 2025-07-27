import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, Package, Users, Phone, Settings, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/BU.webp';
import enactusLogo from '../assets/logos/Enactus-logo-black.webp';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { totalItems, setCartOpen, addTrigger } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartVibrating, setIsCartVibrating] = useState(false);

  // Hero section in view detection
  const [heroInView, setHeroInView] = useState(true);

  const { i18n, t } = useTranslation();
  
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    // Find the hero section by id
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0.2, 0.5, 0.8] }
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: t('nav.home'), section: 'hero', icon: Home },
    { name: t('nav.products'), section: 'products', icon: Package },
    { name: t('nav.about'), section: 'about', icon: Users },
    { name: t('nav.testimonials'), section: 'TESTIMONIALS', icon: Star },
    { name: t('nav.contact'), section: 'footer', icon: Phone },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/40 shadow-xl backdrop-blur-xl border border-white/10' 
            : 'bg-transparent'
        } rounded-2xl`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
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
                  <img src={logo} alt="Beyound Logo" className="h-8 sm:h-12 w-auto" style={{ objectFit: 'contain', aspectRatio: '1.42' }} width="45" height="32" loading="eager" decoding="async" />
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
                  <img src={enactusLogo} alt="Enactus Logo" className="h-10 w-auto sm:h-16 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] drop-shadow-[0_0px_32px_rgba(255,255,255,0.8)] drop-shadow-[0_2px_48px_rgba(0,0,0,0.95)]" width="40" height="40" decoding="async" />
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
                <span className="hidden sm:inline">{t('nav.login')}</span>
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
                duration: 0.6
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
              className="absolute top-0 bg-gradient-to-br from-purple-900/90 via-black/95 to-black/90 backdrop-blur-xl w-[85%] h-full max-w-sm rounded-r-3xl shadow-2xl border-r border-white/10 flex flex-col"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut"
              }}
            >
              {/* Logo Section */}
              <div className="p-6 border-b border-white/10">
                <img src={logo} alt="BU Logo" className="h-8 w-auto" />
              </div>
              
              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-3 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        const element = document.getElementById(item.section);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span>{item.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Cart Button */}
              <div className="p-4 border-t border-white/10">
                <motion.button
                  className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    setCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
                    <ShoppingCart className="h-5 w-5" />
                  </span>
                  <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
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
            <img src={logo} alt="Beyound Logo" className="h-10 w-auto sm:h-16" width="64" height="48" decoding="async" />
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
            <img src={enactusLogo} alt="Enactus Logo" className="h-12 w-auto sm:h-20 drop-shadow-[0_12px_48px_rgba(0,0,0,1)] drop-shadow-[0_0px_48px_rgba(255,255,255,0.9)] drop-shadow-[0_4px_64px_rgba(0,0,0,1)]" width="80" height="60" decoding="async" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Language Switcher */}
      <motion.button
        className="fixed md:right-6 right-2 md:top-1/2 bottom-24 md:-translate-y-1/2 z-[60] md:w-12 w-10 md:h-20 h-16 rounded-full cursor-pointer overflow-hidden bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg"
        onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute left-1 right-1 top-1 md:h-[calc(50%-4px)] h-[calc(50%-3px)] rounded-full bg-white shadow-lg flex items-center justify-center"
          animate={{
            y: i18n.language === 'en' ? '0%' : '100%'
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <span className="text-black md:text-sm text-xs font-medium">
            {i18n.language === 'en' ? 'E' : 'AR'}
          </span>
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-between md:py-3 py-2 pointer-events-none">
          <span className={`text-white md:text-sm text-xs font-medium transition-opacity duration-200 ${
            i18n.language === 'en' ? 'opacity-0' : 'opacity-100'
          }`}>
            E
          </span>
          <span className={`text-white md:text-sm text-xs font-medium transition-opacity duration-200 ${
            i18n.language === 'en' ? 'opacity-100' : 'opacity-0'
          }`}>
            AR
          </span>
        </div>
      </motion.button>
    </>
  );
};

export default Navigation; 