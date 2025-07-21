import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import quarterZipperImg from '../assets/product-images/quarterzibber-thumpnail.webp';
import pantsImg from '../assets/product-images/pants-thumpnail.webp';
import shirtImg from '../assets/product-images/shirt-thumpnail.webp';
import buLogo from '../assets/logos/BU.webp';
import enactusLogo from '../assets/logos/Enactus-logo-black.webp';
import BackgroundGradientAnimation from '../components/BackgroundGradientAnimation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    streetName: '',
    buildingNumber: '',
    apartmentNumber: '',
    floor: '',
    governorate: '',
    additionalNotes: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'district', 'streetName', 'buildingNumber', 'apartmentNumber', 'floor', 'governorate'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    try {
      // Save order info locally
      localStorage.setItem('lastOrder', JSON.stringify({
        customer: formData,
        items,
        total: totalPrice,
        date: new Date().toISOString()
      }));

      // Prepare order payload for backend
      const orderPayload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: `${formData.streetName}, ${formData.buildingNumber}, ${formData.apartmentNumber}, Floor ${formData.floor}`,
          city: formData.city,
          state: formData.governorate,
          zipCode: formData.district,
          country: 'Egypt'
        },
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size
        })),
        paymentStatus: 'pending',
        notes: formData.additionalNotes || '',
      };

      console.log('=== SENDING ORDER PAYLOAD ===');
      console.log('Order payload:', orderPayload);
      console.log('Cart items:', items);
      console.log('Cart items structure:', items.map(item => ({
        hasProductId: !!item.productId,
        productId: item.productId,
        hasSize: !!item.size,
        size: item.size,
        name: item.name
      })));

      // Send to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderData = await response.json();
      console.log('Order created successfully:', orderData);
      
      // Show success message
      localStorage.setItem('lastOrderNumber', orderData.orderNumber);
      alert('Order placed successfully! Order ID: ' + orderData.orderNumber);

      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      localStorage.removeItem('cart');
      navigate('/order-confirmation');
    } catch (error) {
      let errorMsg = 'Payment failed';
      if (error && error.message) errorMsg = error.message;
      // Try to extract backend error message
      if (error && error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      }
      alert('Order failed: ' + errorMsg);
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  // Map product names to images
  const productImages = {
    'Quarter Zipper': quarterZipperImg,
    'Pants': pantsImg,
    'Shirt': shirtImg,
  };

  // Autofill location using browser geolocation and reverse geocoding
  // const handleUseCurrentLocation = async () => {
  //   if (!navigator.geolocation) {
  //     alert('Geolocation is not supported by your browser.');
  //     return;
  //   }
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     const { latitude, longitude } = position.coords;
  //     try {
  //       // Use OpenStreetMap Nominatim API for reverse geocoding
  //       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  //       const data = await response.json();
  //       const city = data.address.city || data.address.town || data.address.village || '';
  //       const governorate = data.address.state || '';
  //       setFormData(prev => ({
  //         ...prev,
  //         city,
  //         governorate,
  //       }));
  //     } catch (error) {
  //       alert('Could not fetch location details.');
  //     }
  //   }, () => {
  //     alert('Unable to retrieve your location.');
  //   });
  // };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <BackgroundGradientAnimation />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <motion.button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent m-0 p-0">
      <BackgroundGradientAnimation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-gray-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shopping
          </button>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        errors.firstName ? 'border-red-500' : 'border-white/20'
                      } text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        errors.lastName ? 'border-red-500' : 'border-white/20'
                      } text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        errors.email ? 'border-red-500' : 'border-white/20'
                      } text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        errors.phone ? 'border-red-500' : 'border-white/20'
                      } text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="+20 100 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.city ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="Cairo"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.district ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="Nasr City"
                    />
                    {errors.district && <p className="text-red-400 text-sm mt-1">{errors.district}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Street Name *</label>
                    <input
                      type="text"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.streetName ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="Tayaran St."
                    />
                    {errors.streetName && <p className="text-red-400 text-sm mt-1">{errors.streetName}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Building Number *</label>
                      <input
                        type="text"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.buildingNumber ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                        placeholder="12"
                      />
                      {errors.buildingNumber && <p className="text-red-400 text-sm mt-1">{errors.buildingNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Apartment Number *</label>
                      <input
                        type="text"
                        name="apartmentNumber"
                        value={formData.apartmentNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.apartmentNumber ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                        placeholder="5B"
                      />
                      {errors.apartmentNumber && <p className="text-red-400 text-sm mt-1">{errors.apartmentNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Floor *</label>
                      <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.floor ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                        placeholder="3"
                      />
                      {errors.floor && <p className="text-red-400 text-sm mt-1">{errors.floor}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Governorate *</label>
                    <input
                      type="text"
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.governorate ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:outline-none focus:border-purple-500`}
                      placeholder="Cairo Governorate"
                    />
                    {errors.governorate && (
                      <p className="text-red-400 text-sm mt-1">{errors.governorate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Additional Notes (optional)</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                      placeholder="Any extra instructions for delivery (e.g., call on arrival, leave at security, etc.)"
                    />
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id + '-' + item.size} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={productImages[item.name]}
                        alt={item.name + ' thumbnail'}
                        className="w-12 h-12 object-cover rounded-lg border border-white/10 shadow"
                      />
                      <div>
                        <h3 className="text-white font-medium">{item.name}</h3>
                        {item.size && (
                          <p className="text-gray-400 text-xs">Size: {item.size}</p>
                        )}
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-white font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/20 mt-6 pt-6">
                <div className="flex justify-between items-center text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Shipped all over Egypt</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 border-2 border-yellow-400 py-4 px-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Place Order - ${formatPrice(totalPrice)}`
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
      <LogosFooter />
    </div>
  );
};

// Add logos at the bottom of the checkout page
const LogosFooter = () => (
  <div className="w-full flex flex-col items-center justify-center mt-12 mb-4">
    <div className="relative flex items-center justify-center">
      {/* Center shadow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-24 sm:w-64 sm:h-32 bg-black/60 rounded-full blur-2xl opacity-60 z-0"></div>
      <div className="flex items-center space-x-6 relative z-10">
        <img src={buLogo} alt="BU Logo" className="h-20 w-auto object-contain drop-shadow-lg" style={{ aspectRatio: '1.42' }} width="80" height="56" loading="lazy" decoding="async" />
        <span className="text-white text-4xl font-bold drop-shadow-lg">×</span>
        <img src={enactusLogo} alt="Enactus Logo" className="h-20 w-auto object-contain drop-shadow-lg" width="80" height="56" loading="lazy" decoding="async" />
      </div>
    </div>
  </div>
);

export default CheckoutPage;
export { LogosFooter }; 