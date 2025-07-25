import React, { useRef as reactUseRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const ProductSection = ({ product, index }) => {
  const ref = reactUseRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart, totalItems } = useCart();
  const videoRef = reactUseRef(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isVideoGrowing, setIsVideoGrowing] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Map product names to video filenames
  const videoFiles = {
    'Quarter Zipper': require('../assets/videos/quarter zipper.mp4'),
    'Pants': require('../assets/videos/pants.mp4'),
    'Shirt': require('../assets/videos/shirt.mp4'),
  };

  const handleAddToCart = () => {
    addToCart({ ...product, productId: product._id, size: selectedSize }, 1);
    // Only trigger video growth animation if cart has less than 10 items
    if (totalItems < 10) {
      setIsVideoGrowing(true);
      setTimeout(() => setIsVideoGrowing(false), 600);
    }
  };

  // Ensure video autoplays on mobile
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      };
      
      // Try to play immediately
      playVideo();
      
      // Also try when user interacts with the page
      const handleUserInteraction = () => {
        playVideo();
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
      
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('click', handleUserInteraction);
      
      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, [videoRef]);

  return (
    <section 
      ref={ref} 
      className={`section-container bg-transparent relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75% 75%, black 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-1 sm:px-4 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl md:text-7xl font-bold text-white font-display mb-6 sm:mb-8">
            {product.name}
          </h2>
          <div className="w-16 sm:w-32 h-1 bg-white/20 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
          {/* Product Video - Always First on mobile, Left on desktop */}
          <motion.div variants={itemVariants} className="z-0 order-1 lg:order-1">
            <div className="relative">
              <motion.div
                className={`w-full max-w-[140px] sm:max-w-[180px] md:max-w-[160px] lg:max-w-[220px] mx-auto bg-transparent rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center group relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                animate={isVideoGrowing ? { scale: [1, 1.15, 1] } : {}}
                transition={isVideoGrowing ? { duration: 0.6, ease: "easeInOut" } : { type: "spring", stiffness: 300 }}
              >
                {/* Product Video (autoplay, always visible) */}
                <video
                  ref={videoRef}
                  className="w-full h-auto object-contain rounded-lg sm:rounded-xl lg:rounded-2xl relative z-20"
                  src={videoFiles[product.name]}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="false"
                />
                {/* Overlayed Initial (hidden when image/video shown) */}
                <div className="w-full h-full flex items-center justify-center relative z-30 transition-opacity duration-300 opacity-0">
                  <span className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-400 select-none">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-black/20 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Details - Always Second on mobile, Right on desktop */}
          <motion.div variants={itemVariants} className="text-left relative z-10 w-full order-2 lg:order-2">
            <div className="flex-1 flex flex-col justify-between bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 rounded-lg sm:rounded-xl p-1.5 sm:p-4 md:p-5 shadow-xl border border-white/10 pointer-events-auto w-full max-w-[280px] sm:max-w-none mx-auto">
              <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-3 text-[10px] sm:text-base md:text-lg">
                {product.name}
              </h3>
              
              <p className="text-[9px] sm:text-sm text-gray-200 mb-1.5 sm:mb-4 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-1 sm:space-y-2 mb-1.5 sm:mb-4 flex-1">
                {product.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-0.5 sm:space-x-1.5">
                    <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white rounded-full flex-shrink-0" />
                    <span className="text-[9px] sm:text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1.5 sm:mb-4 gap-2 sm:gap-0">
                <span className="text-sm sm:text-xl md:text-2xl font-bold text-white">
                  {product.price} EGP
                </span>
              </div>

              {/* Size Selector */}
              <div className="mb-1.5 sm:mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-xs sm:text-base text-white">Size:</span>
                {['S', 'M', 'L'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full border-2 font-bold transition-all duration-200 focus:outline-none text-xs sm:text-base ${selectedSize === size ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105 sm:scale-110' : 'bg-transparent text-white border-white/40 hover:bg-yellow-400 hover:text-black hover:border-yellow-400'}`}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="mt-1 sm:mt-3 md:mt-4 w-full py-2.5 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl bg-yellow-400 text-black font-bold text-sm sm:text-lg md:text-xl shadow-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 border-2 border-yellow-400"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductSection; 