import React, { useRef as reactUseRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import sizeChartImage from '../assets/images/sizeshart.png';

const ProductSection = ({ product }) => {
  const { t } = useTranslation();
  const ref = reactUseRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px", amount: 0.1 });
  const { addToCart, totalItems } = useCart();
  const videoRef = reactUseRef(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isVideoGrowing, setIsVideoGrowing] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const videoFiles = {
    'Quarter Zipper': require('../assets/videos/quarter zipper.mp4'),
    'Pants': require('../assets/videos/pants.mp4'),
    'Shirt': require('../assets/videos/shirt.mp4'),
  };

  const handleAddToCart = () => {
    addToCart({ ...product, productId: product._id, size: selectedSize }, 1);
    if (totalItems < 10) {
      setIsVideoGrowing(true);
      setTimeout(() => setIsVideoGrowing(false), 400);
    }
  };

  useEffect(() => {
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch (_) {}
    };

    playVideo();
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
  }, []);

  return (
    <section ref={ref} className="section-container bg-transparent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 75% 75%, black 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
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
          {/* Product Video */}
          <motion.div variants={itemVariants} className="z-0 order-1 lg:order-1">
            <div className="relative z-[1]">
              <motion.div
                className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[160px] lg:max-w-[220px] mx-auto bg-transparent rounded-lg flex items-center group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                animate={isVideoGrowing ? { scale: [1, 1.1, 1] } : {}}
                transition={isVideoGrowing ? { duration: 0.4, ease: "easeOut" } : { type: "spring", stiffness: 400, damping: 25 }}
              >
                {!showSizeChart && (
                  <video
                    ref={videoRef}
                    className="w-full h-auto object-contain rounded-lg relative z-[1]"
                    src={videoFiles[product.name]}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="text-left relative z-10 w-full order-2 lg:order-2">
            <div className="flex-1 flex flex-col justify-between bg-gradient-to-r from-black via-gray-900 to-black rounded-lg p-1.5 sm:p-4 md:p-5 border border-white/10 w-full max-w-[280px] sm:max-w-none mx-auto">
              <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-1">
                {product.name}
              </h3>

              <p className="text-[9px] sm:text-sm text-gray-200 mb-4">{product.description}</p>

              <div className="space-y-2 mb-4">
                {product.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <span className="text-[9px] sm:text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <span className="text-sm sm:text-xl font-bold text-white mb-4">
                {product.price} EGP
              </span>

              {/* Size Selector */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-xs sm:text-base text-white">{t('products.size')}:</span>
                {['S', 'M', 'L'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-full border-2 font-bold text-xs sm:text-base ${
                      selectedSize === size
                        ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105'
                        : 'bg-transparent text-white border-white/40 hover:bg-yellow-400 hover:text-black hover:border-yellow-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="px-3 py-1 rounded-full border-2 border-white/40 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-xs sm:text-base"
                >
                  Size Chart
                </button>
              </div>

              {/* Size Chart Modal */}
              {showSizeChart && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center p-4 isolation-isolate"
                  onClick={() => setShowSizeChart(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-white rounded-lg p-2 max-w-2xl max-h-[90vh] overflow-auto z-[10000]"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-[10001]"
                      onClick={() => setShowSizeChart(false)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img src={sizeChartImage} alt="Size Chart" className="w-full h-auto z-[10001]" />
                  </motion.div>
                </div>
              )}

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="mt-3 w-full py-3 rounded-lg bg-yellow-400 text-black font-bold text-sm sm:text-lg shadow-lg hover:bg-yellow-300 transition-colors border-2 border-yellow-400"
              >
                {t('products.addToCart')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductSection;