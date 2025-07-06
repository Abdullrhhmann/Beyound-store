import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Leaf, Target, Star, Award, Globe, BookOpen, AlertTriangle } from 'lucide-react';
import ceoImage from '../assets/images/ceo.jpg';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

const AboutSection = () => {
  const stats = [
    { number: "100%", label: "Adaptive Design", icon: <Target className="w-6 h-6" /> },
    { number: "0%", label: "Textile Waste", icon: <Leaf className="w-6 h-6" /> },
    { number: "∞", label: "Empowerment", icon: <Heart className="w-6 h-6" /> },
    { number: "100%", label: "Innovation", icon: <Users className="w-6 h-6" /> },
  ];

  const values = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Empowerment",
      description: "Every stitch empowers individuals with disabilities to dress with dignity, comfort, and style."
    },
    {
      icon: <Leaf className="w-12 h-12 text-green-500" />,
      title: "Sustainability",
      description: "We create adaptive clothing from repurposed textile waste, reducing environmental impact."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Community",
      description: "Crafted by strong, underprivileged women trained to lead production with pride and purpose."
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: "Inclusion",
      description: "Fashion that adapts to needs, not the other way around. Everyone deserves to be seen."
    }
  ];

  // Optimized animations: only transform and opacity, shorter duration on mobile
  const baseDuration = isMobile ? 0.3 : 0.6;
  const baseEase = [0.25, 0.46, 0.45, 0.94];

  const slideInFromLeft = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: baseDuration,
        ease: baseEase
      }
    }
  };

  const slideInFromRight = {
    hidden: {
      opacity: 0,
      x: 50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: baseDuration,
        ease: baseEase
      }
    }
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.25 : 0.5,
        ease: baseEase
      }
    }
  };

  return (
    <section className="section-container bg-transparent pt-0 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section - Slides in from left */}
        {isMobile ? (
          <div className="text-center mb-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-4 md:mb-6 font-medium"></p>
          </div>
        ) : (
          <motion.div 
            className="text-center mb-8"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <motion.p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-4 md:mb-6 font-medium"></motion.p>
          </motion.div>
        )}

        {/* Main Story, CEO, & Problem Redesigned - Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch mb-16 md:mb-24">
          {/* Our Story Card */}
          {isMobile ? (
            <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-3xl shadow-black/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mr-2 md:mr-3" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Our Story</h3>
                </div>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  Our story began with a moment of clarity when we realized that for millions, clothing wasn't a source of confidence, but of daily struggle. <span className="font-semibold text-white">We recognized that adaptive clothing was missing, and so were the voices it was meant to serve.</span>
                </p>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  While tons of textile waste were being dumped into our environment, we launched our mission turning this problem into potential; <span className="font-semibold text-white">creating adaptive clothes from upcycled materials, sewn by strong, underprivileged women.</span>
                </p>
                <p className="text-base md:text-lg text-gray-100 italic">
                  For those who need more than just clothes; <span className="font-semibold text-white">they need to be seen.</span>
                </p>
              </div>
            </div>
          ) : (
            <motion.div 
              className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-3xl shadow-black/60 flex flex-col justify-between"
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mr-2 md:mr-3" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Our Story</h3>
                </div>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  Our story began with a moment of clarity when we realized that for millions, clothing wasn't a source of confidence, but of daily struggle. <span className="font-semibold text-white">We recognized that adaptive clothing was missing, and so were the voices it was meant to serve.</span>
                </p>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  While tons of textile waste were being dumped into our environment, we launched our mission turning this problem into potential; <span className="font-semibold text-white">creating adaptive clothes from upcycled materials, sewn by strong, underprivileged women.</span>
                </p>
                <p className="text-base md:text-lg text-gray-100 italic">
                  For those who need more than just clothes; <span className="font-semibold text-white">they need to be seen.</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* CEO Image Card */}
          {isMobile ? (
            <div className="bg-gradient-to-br from-blue-900/80 via-black/80 to-purple-900/80 rounded-2xl md:rounded-3xl shadow-3xl shadow-black/60 overflow-hidden">
              <img src={ceoImage} alt="CEO" className="w-full h-full object-cover" />
            </div>
          ) : (
            <motion.div 
              className="bg-gradient-to-br from-blue-900/80 via-black/80 to-purple-900/80 rounded-2xl md:rounded-3xl shadow-3xl shadow-black/60 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <img src={ceoImage} alt="CEO" className="w-full h-full object-cover" />
            </motion.div>
          )}

          {/* The Problem Card */}
          {isMobile ? (
            <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-3xl shadow-black/60 flex flex-col">
              <div>
                <div className="flex items-center mb-6 md:mb-10">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-400 mr-2 md:mr-3" />
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">Our Need</h3>
                </div>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  <span className="font-semibold text-white">Getting dressed shouldn't be a daily battle;</span> but for people with mobility, sensory, or physical challenges, it often is.
                </p>
                <p className="text-base md:text-lg text-gray-100">
                  Traditional fashion <span className="font-semibold text-white">excludes their needs</span>, adding frustration to already difficult routines.
                </p>
              </div>
            </div>
          ) : (
            <motion.div 
              className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-3xl shadow-black/60 flex flex-col"
              variants={slideInFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div>
                <div className="flex items-center mb-6 md:mb-10">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-400 mr-2 md:mr-3" />
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">Our Need</h3>
                </div>
                <p className="text-base md:text-lg text-gray-100 mb-4">
                  <span className="font-semibold text-white">Getting dressed shouldn't be a daily battle;</span> but for people with mobility, sensory, or physical challenges, it often is.
                </p>
                <p className="text-base md:text-lg text-gray-100">
                  Traditional fashion <span className="font-semibold text-white">excludes their needs</span>, adding frustration to already difficult routines.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mission Statement */}
        {isMobile ? (
          <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 md:p-12 rounded-2xl md:rounded-3xl mb-16 md:mb-24 text-center">
            <div className="flex justify-center mb-6">
              <Globe className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">To Empower. To Include. To <span className="font-bold">BEYOUND</span>.</p>
            <p className="text-base md:text-lg text-gray-300 mt-4 md:mt-6 max-w-3xl mx-auto">We exist to empower individuals with disabilities by designing fashion that adapts to their needs, not the other way around. Our mission is rooted in sustainability, social inclusion, and community-driven innovation.</p>
          </div>
        ) : (
          <motion.div 
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 md:p-12 rounded-2xl md:rounded-3xl mb-16 md:mb-24 text-center"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ transform: 'rotate(0deg)' }}
              whileInView={{ transform: 'rotate(360deg)' }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform' }}
            >
              <Globe className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">To Empower. To Include. To <span className="font-bold">BEYOUND</span>.</p>
            <p className="text-base md:text-lg text-gray-300 mt-4 md:mt-6 max-w-3xl mx-auto">We exist to empower individuals with disabilities by designing fashion that adapts to their needs, not the other way around. Our mission is rooted in sustainability, social inclusion, and community-driven innovation.</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
          {stats.map((stat, index) => (
            isMobile ? (
              <div 
                key={stat.label}
                className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-black via-gray-900 to-black"
              >
                <div className="flex justify-center mb-3 text-blue-500">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ) : (
              <motion.div 
                key={stat.label}
                className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-black via-gray-900 to-black"
                whileHover={{ 
                  transform: 'scale(1.05) translateY(-10px)',
                  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                style={{ willChange: 'transform, opacity, filter' }}
              >
                <div className="flex justify-center mb-3 text-blue-500">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-100 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-24">
          {isMobile ? (
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12 md:mb-16">Our Values</h3>
          ) : (
            <motion.h3 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12 md:mb-16"
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              Our Values
            </motion.h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              isMobile ? (
                <div 
                  key={value.title}
                  className="text-center p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-black via-gray-900 to-black"
                >
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-2">{value.title}</div>
                  <div className="text-base md:text-lg text-gray-100">{value.description}</div>
                </div>
              ) : (
                <motion.div 
                  key={value.title}
                  className="text-center p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-black via-gray-900 to-black"
                  whileHover={{ 
                    transform: 'scale(1.05) translateY(-10px)',
                    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-2">{value.title}</div>
                  <div className="text-base md:text-lg text-gray-100">{value.description}</div>
                </motion.div>
              )
            ))}
          </div>
        </div>

        {/* Solution Section - Individual triggers */}
        <div className="mb-12 md:mb-16">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <Award className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mx-auto mb-3 md:mb-4" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Our Solution
            </h3>
            <p className="text-lg md:text-xl text-white">
              We Created Clothes That Don't Just Fit, They Free.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* First Flash Card - Slides in from left */}
            <motion.div 
              className="bg-gradient-to-br from-blue-900 via-black to-blue-800 p-6 md:p-8 rounded-3xl shadow-2xl border border-blue-500/20 flex flex-col justify-center min-h-[280px] md:min-h-[320px] transform rotate-3"
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm md:text-base">1</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white">Accessibility Features</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Magnetic fastenings for easy dressing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Side openings for accessibility</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Sensory-friendly fabrics</p>
                </div>
              </div>
            </motion.div>

            {/* Second Flash Card - Slides in from right */}
            <motion.div 
              className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 p-6 md:p-8 rounded-3xl shadow-3xl shadow-black/60 border border-red-500/20 flex flex-col justify-center min-h-[280px] md:min-h-[320px] transform rotate-3"
              variants={slideInFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm md:text-base">2</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white">Sustainable Impact</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Made from repurposed textile waste</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Crafted by women from overlooked communities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-100 text-sm md:text-base">Without compromising style or identity</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final Call to Action - Slides in from left */}
        <motion.div 
          className="text-center"
          variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <motion.p 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            whileHover={{ 
              transform: 'scale(1.05)',
              transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            style={{ willChange: 'transform' }}
          >
           
          </motion.p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 