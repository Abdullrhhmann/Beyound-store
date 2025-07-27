import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import quarterZipperImg from '../assets/product-images/quarterzibber-thumpnail.webp';
import pantsImg from '../assets/product-images/pants-thumpnail.webp';
import shirtImg from '../assets/product-images/shirt-thumpnail.webp';

const CartDrawer = () => {
  const { items, isCartOpen, setCartOpen, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map product names to images
  const productImages = {
    'Quarter Zipper': quarterZipperImg,
    'Pants': pantsImg,
    'Shirt': shirtImg,
  };

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed top-0 h-full bg-black/60 border-l border-black/10 z-[100] ${
              isMobile 
                ? 'left-2 right-2 top-2 bottom-2 h-auto rounded-2xl shadow-2xl' 
                : 'right-0 w-full max-w-md'
            }`}
            initial={isMobile ? { y: '100%', opacity: 0, scale: 0.9 } : { x: '100%' }}
            animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { x: 0 }}
            exit={isMobile ? { y: '100%', opacity: 0, scale: 0.9 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={`flex flex-col ${isMobile ? 'h-full max-h-[90vh]' : 'h-full'}`}>
              {/* Header */}
              <div className={`flex items-center justify-between border-b border-black/10 ${
                isMobile ? 'p-4' : 'p-6'
              }`}>
                <h2 className={`font-semibold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  Shopping Cart
                </h2>
                <motion.button
                  onClick={() => setCartOpen(false)}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    isMobile ? 'p-3' : 'p-2'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className={`text-white ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className={`flex-1 overflow-y-auto ${
                isMobile ? 'p-4' : 'p-6'
              }`}>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className={`text-gray-400 mb-4 ${
                      isMobile ? 'h-12 w-12' : 'h-16 w-16'
                    }`} />
                    <h3 className={`font-medium text-gray-500 mb-2 ${
                      isMobile ? 'text-base' : 'text-lg'
                    }`}>Your cart is empty</h3>
                    <p className="text-gray-400 text-sm">Add some products to get started</p>
                  </div>
                ) : (
                  <div className={`space-y-3 ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                    {items.map((item) => (
                      <motion.div
                        key={item.productId + '-' + item.size}
                        className={`flex items-center space-x-3 p-3 bg-gradient-to-r from-black via-gray-900 to-black rounded-lg ${
                          isMobile ? 'p-3 space-x-3' : 'p-4 space-x-4'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={productImages[item.name]}
                            alt={item.name + ' thumbnail'}
                            className={`object-cover rounded-lg border border-white/10 shadow ${
                              isMobile ? 'w-12 h-12' : 'w-16 h-16'
                            }`}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium text-white truncate ${
                            isMobile ? 'text-sm' : 'text-sm'
                          }`}>
                            {item.name}
                          </h3>
                          {item.size && (
                            <p className={`text-gray-200 mt-1 ${
                              isMobile ? 'text-xs' : 'text-xs'
                            }`}>Size: {item.size}</p>
                          )}
                          <p className={`text-white ${
                            isMobile ? 'text-sm' : 'text-sm'
                          }`}>
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}
                            className={`rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${
                              isMobile ? 'p-2' : 'p-1'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className={`text-black ${
                              isMobile ? 'h-4 w-4' : 'h-4 w-4'
                            }`} />
                          </motion.button>
                          
                          <span className={`text-white font-medium min-w-[2rem] text-center ${
                            isMobile ? 'text-sm' : 'text-sm'
                          }`}>
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}
                            className={`rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${
                              isMobile ? 'p-2' : 'p-1'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className={`text-black ${
                              isMobile ? 'h-4 w-4' : 'h-4 w-4'
                            }`} />
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className={`rounded-full bg-red-100 hover:bg-red-200 transition-colors ${
                            isMobile ? 'p-2' : 'p-1'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className={`text-red-500 ${
                            isMobile ? 'h-4 w-4' : 'h-4 w-4'
                          }`} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className={`border-t border-black/10 bg-black/60 ${
                  isMobile ? 'p-4' : 'p-6'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`font-medium text-black ${
                      isMobile ? 'text-base' : 'text-lg'
                    }`}>Total:</span>
                    <span className={`font-bold text-black ${
                      isMobile ? 'text-lg' : 'text-xl'
                    }`}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={clearCart}
                    className={`w-full mb-3 rounded-lg border-2 border-red-400 text-red-600 font-semibold hover:bg-red-50 transition-colors duration-200 ${
                      isMobile ? 'py-3 text-sm' : 'py-2'
                    }`}
                  >
                    Clear Cart
                  </button>
                  <motion.button
                    onClick={handleCheckout}
                    className={`w-full bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 border-2 border-yellow-400 ${
                      isMobile ? 'py-4 px-6 text-base' : 'py-3 px-6'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer; 