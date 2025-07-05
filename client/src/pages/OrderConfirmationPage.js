import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Package, Truck, Mail } from 'lucide-react';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  // Get the backend order number from localStorage
  const orderNumber = localStorage.getItem('lastOrderNumber') || 'N/A';

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-black/60 overflow-hidden">
      <div className="max-w-lg w-full max-h-[90vh] h-auto flex flex-col items-center justify-center bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl p-4 sm:p-8 shadow-2xl overflow-hidden text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-2"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-base mb-4"
          >
            Thank you for your purchase! Your order has been placed and is being processed.
          </motion.p>

          {/* Order Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 rounded-xl p-3 mb-4 w-full max-w-xs mx-auto"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Order Number</h2>
            <p className="text-xl font-bold text-purple-400 font-mono">{orderNumber}</p>
            <p className="text-gray-400 text-xs mt-1">
              Please save this number for your records
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-4 w-full"
          >
            <h3 className="text-base font-semibold text-white mb-2">What happens next?</h3>
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-gray-300 text-xs mt-1">Email sent</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-gray-300 text-xs mt-1">Preparing</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-gray-300 text-xs mt-1">Shipped</p>
              </div>
            </div>
          </motion.div>

          {/* Estimated Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 mb-4 w-full max-w-xs mx-auto"
          >
            <h3 className="text-base font-semibold text-white mb-1">Estimated Delivery</h3>
            <p className="text-lg font-bold text-white">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-gray-300 text-xs mt-1">
              You'll receive tracking info once your order ships
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full"
          >
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center justify-center px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg border-2 border-yellow-400 hover:bg-yellow-300 hover:text-black transition-colors duration-200 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5 mr-2" />
              Continue Shopping
            </motion.button>
            <motion.button
              onClick={() => window.print()}
              className="flex items-center justify-center px-6 py-3 bg-white/10 text-white border-2 border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Package className="w-5 h-5 mr-2" />
              Print Receipt
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 