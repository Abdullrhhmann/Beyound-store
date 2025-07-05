import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?limit=10');
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to static data if API fails
        setTestimonials([
          {
            _id: 1,
            name: "Sarah Johnson",
            quote: "This platform has completely transformed my shopping experience. The smooth animations and intuitive design make every purchase a pleasure.",
            rating: 5
          },
          {
            _id: 2,
            name: "Michael Chen",
            quote: "I've never seen such attention to detail in an e-commerce site. The product presentations are stunning and the checkout process is seamless.",
            rating: 5
          },
          {
            _id: 3,
            name: "Emily Rodriguez",
            quote: "The customer service is exceptional and the product quality is outstanding. This is now my go-to platform for all my shopping needs.",
            rating: 5
          },
          {
            _id: 4,
            name: "David Thompson",
            quote: "The mobile experience is just as smooth as desktop. The responsive design and touch interactions are perfectly implemented.",
            rating: 5
          },
          {
            _id: 5,
            name: "Lisa Wang",
            quote: "I love how each product section has its own unique feel with the dynamic background colors. It creates such an immersive experience.",
            rating: 5
          },
          {
            _id: 6,
            name: "Alex Martinez",
            quote: "The attention to detail in the UI/UX is remarkable. Every interaction feels natural and the visual feedback is spot on.",
            rating: 5
          },
          {
            _id: 7,
            name: "Rachel Green",
            quote: "Fast shipping and excellent packaging. The products arrived in perfect condition and exceeded my expectations.",
            rating: 5
          },
          {
            _id: 8,
            name: "James Wilson",
            quote: "The search functionality is incredibly intuitive. I can find exactly what I'm looking for in seconds.",
            rating: 5
          },
          {
            _id: 9,
            name: "Maria Garcia",
            quote: "The loyalty program is fantastic. I love earning points with every purchase and the exclusive member benefits.",
            rating: 5
          },
          {
            _id: 10,
            name: "Tom Anderson",
            quote: "Outstanding quality and competitive prices. This platform has become my first choice for online shopping.",
            rating: 5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const Card = ({ testimonial, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        variants={cardVariants}
        className="relative w-48 sm:w-56 h-64 sm:h-80 perspective-1000 mx-auto"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onTouchStart={() => setIsFlipped(!isFlipped)}
        style={{ minWidth: '12rem' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Back (Poker Card Style) */}
          <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-red-900/80 via-black/80  rounded-2xl md:rounded-lg p-6 md:p-8 shadow-3xl shadow-black/60 flex flex-col justify-center relative overflow-hidden">
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-2 left-2 text-white text-2xl font-bold">♠</div>
                <div className="absolute bottom-2 right-2 text-white text-2xl font-bold transform rotate-180">♠</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl opacity-30">♠</div>
              </div>
              {/* Card Border Pattern */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-lg m-2 pointer-events-none"></div>
              <div className="absolute inset-0 border border-white/10 rounded-lg m-4 pointer-events-none"></div>
              {/* Name */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-2">
                  <h3 className="text-white text-xl font-bold mb-2 tracking-wider break-words leading-tight">
                    {testimonial.name}
                  </h3>
                  
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
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-xl border-2 shadow-2xl p-4 flex flex-col justify-between">
              {/* Quote */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-accent-red text-3xl mb-1">"</div>
                <p className="text-dark-900 text-sm leading-relaxed italic text-center break-words">
                  {testimonial.quote}
                </p>
              </div>
              {/* Rating and Name */}
              <div className="mt-2 text-center">
                <div className="flex justify-center space-x-1 mb-1">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className=" font-semibold text-xs">
                  {testimonial.name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section ref={ref} className="section-container bg-white relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-container bg-transpearant relative py-20">
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
      >
        {/* Section Title */}
        <motion.div 
          variants={cardVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover why people love our adaptive clothing and the difference it makes in their lives
          </p>
          {/* Mobile scroll hint */}
          <div className="md:hidden mt-4 text-gray-400 text-xs">
            ← Swipe to see more testimonials →
          </div>
        </motion.div>
        {/* Cards Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="mb-8">
          {/* First Row */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {testimonials.slice(0, 5).map((testimonial, index) => (
              <div key={testimonial._id || index} className="flex-shrink-0 md:flex-shrink snap-center">
                <Card testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>
        
                  {/* Second Row */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
          {testimonials.slice(5, 10).map((testimonial, index) => (
            <div key={testimonial._id || index + 5} className="flex-shrink-0 md:flex-shrink snap-center">
              <Card testimonial={testimonial} index={index + 5} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <style jsx>{`
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
        
        /* Smooth scrolling for mobile */
        .overflow-x-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Better touch scrolling on mobile */
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
      `}</style>
    </section>
  );
};

export default TestimonialsSection; 