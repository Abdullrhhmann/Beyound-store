import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';

const testimonialData = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "Cairo, Egypt",
    rating: 5,
    comment: "The Quarter Zipper jacket has been a game-changer for me. As someone who values both style and comfort, I couldn't be happier. The premium materials and thoughtful design make it perfect for both casual outings and semi-formal occasions. The zipper is smooth and durable - exactly what I was looking for!",
    productPurchased: "Quarter Zipper",
    date: "2025-06-15"
  },
  {
    id: 2,
    name: "Mohammed Karim",
    location: "Alexandria, Egypt",
    rating: 5,
    comment: "These pants are the most comfortable I've ever worn! The premium fabric really makes a difference, and the waistband is perfectly designed. I've bought multiple pairs in different sizes for my family. The quality is consistent, and the price is reasonable for the value you get.",
    productPurchased: "Pants",
    date: "2025-06-20"
  },
  {
    id: 3,
    name: "Nour El-Din",
    location: "6th of October City",
    rating: 4,
    comment: "The shirt is fantastic! The breathable cotton material is perfect for our weather, and it's so easy to iron. I especially appreciate how it looks great in both casual and formal settings. Would love to see more color options though!",
    productPurchased: "Shirt",
    date: "2025-07-01"
  },
  {
    id: 4,
    name: "Fatima Hassan",
    location: "Giza, Egypt",
    rating: 5,
    comment: "I bought the Quarter Zipper for my father who has limited mobility, and it's been perfect! The zipper design makes it easy to put on and take off, while still looking stylish. The durability is impressive - it still looks new after regular use.",
    productPurchased: "Quarter Zipper",
    date: "2025-07-10"
  },
  {
    id: 5,
    name: "Youssef Mahmoud",
    location: "Heliopolis, Cairo",
    rating: 5,
    comment: "The pants are exactly what I needed for daily wear. The fabric quality is excellent, and they maintain their shape even after multiple washes. The size options are perfect, and the fit is true to size. Definitely worth every pound!",
    productPurchased: "Pants",
    date: "2025-07-12"
  }
];

// TestimonialsSection component with 3D card flip animations
const TestimonialsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px", amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = window.innerWidth < 768;
  const testimonials = testimonialData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotateY: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
  };

  const handleSwipedLeft = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const handleSwipedRight = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    trackMouse: true,
  });

  const Card = ({ testimonial, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        variants={cardVariants}
        className="relative w-[280px] sm:w-56 h-[420px] sm:h-80 perspective-1000 mx-auto"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onTouchStart={() => setIsFlipped(!isFlipped)}
        style={{ minWidth: isMobile ? '280px' : '12rem' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Back (Poker Card Style) */}
          <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-red-900/80 via-black/80  rounded-2xl md:rounded-lg p-8 sm:p-6 shadow-3xl shadow-black/60 flex flex-col justify-center relative overflow-hidden">
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-4 left-4 text-white text-3xl sm:text-2xl font-bold">♠</div>
                <div className="absolute bottom-4 right-4 text-white text-3xl sm:text-2xl font-bold transform rotate-180">♠</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl sm:text-6xl opacity-30">♠</div>
              </div>
              {/* Card Border Pattern */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-lg m-3 sm:m-2 pointer-events-none"></div>
              <div className="absolute inset-0 border border-white/10 rounded-lg m-6 sm:m-4 pointer-events-none"></div>
              {/* Name */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-4 sm:px-2">
                  <h3 className="text-white text-2xl sm:text-xl font-bold mb-3 sm:mb-2 tracking-wider break-words leading-tight">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/80 text-base sm:text-sm">
                    {testimonial.location}
                  </p>
                  <p className="text-yellow-400/90 text-sm sm:text-xs mt-2 sm:mt-1">
                    {testimonial.productPurchased}
                  </p>
                </div>
              </div>
              {/* Corner Decorations */}
              <div className="absolute top-3 left-3 text-white text-sm font-bold">♠</div>
              <div className="absolute top-3 right-3 text-white text-sm font-bold">♠</div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-bold transform rotate-180">♠</div>
              <div className="absolute bottom-3 right-3 text-white text-sm font-bold transform rotate-180">♠</div>
            </div>
          </div>

          {/* Card Front (Testimonial) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-white rounded-xl border-2 shadow-2xl p-4 sm:p-4 flex flex-col justify-between overflow-hidden">
              {/* Quote */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="text-accent-red text-3xl sm:text-2xl mb-2 sm:mb-1 text-center">"</div>
                <p className="text-dark-900 text-sm sm:text-xs leading-relaxed italic text-center px-2 sm:px-1">
                  {testimonial.comment}
                </p>
              </div>
              {/* Rating and Name */}
              <div className="mt-4 sm:mt-2 text-center border-t border-gray-100 pt-3 sm:pt-2">
                <div className="flex justify-center space-x-1 sm:space-x-0.5 mb-2 sm:mb-1">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 sm:w-4 sm:h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="font-semibold text-sm sm:text-xs mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-xs">{testimonial.location}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };



  return (
    <section ref={ref} className="section-container bg-transpearant relative py-20" style={{ willChange: 'transform' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, black 1px, transparent 1px), linear-gradient(-45deg, black 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Section Title */}
        <motion.div 
          variants={cardVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
          {/* Mobile scroll hint */}
          {isMobile && (
            <div className="md:hidden mt-4 text-gray-400 text-xs">
              {t('testimonials.swipeHint')}
            </div>
          )}
        </motion.div>
        {/* Mobile: Carousel, Desktop: Grid */}
        {isMobile ? (
          <div {...swipeHandlers} className="relative w-full flex flex-col items-center">
            <div className="w-full flex justify-center items-center" style={{ minHeight: '22rem' }}>
              {testimonials.length > 0 && (
                <Card testimonial={testimonials[currentIndex]} index={currentIndex} />
              )}
            </div>
            {/* Dots navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-gray-500' : 'bg-gray-300'}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* First Row */}
            <div className="md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-4 md:pb-0 mb-8">
              {testimonials.slice(0, 5).map((testimonial, index) => (
                <div key={testimonial._id || index} className="md:flex-shrink">
                  <Card testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>
            {/* Second Row */}
            <div className="md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-4 md:pb-0">
              {testimonials.slice(5, 10).map((testimonial, index) => (
                <div key={testimonial._id || index + 5} className="md:flex-shrink">
                  <Card testimonial={testimonial} index={index + 5} />
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Floating Elements - Optimized for 60fps */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${25 + (i % 2) * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          
          .backface-hidden {
            backface-visibility: hidden;
          }
          
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .overflow-x-auto {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          
          @media (max-width: 768px) {
            .overflow-x-auto {
              scroll-snap-type: x mandatory;
            }
          }
          
          @media (max-width: 1024px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr;
            }
          }
        `
      }} />
    </section>
  );
};

export default TestimonialsSection; 