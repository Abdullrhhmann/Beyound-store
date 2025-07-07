import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ScrollProvider } from './contexts/ScrollContext';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboard from './pages/AdminDashboard';
import Preloader from './components/Preloader';

function App() {
  // Preloader total duration (ms)
  const PRELOADER_DURATION = 2700; // matches Preloader.js
  const APP_REVEAL_BEFORE = 800; // ms before preloader ends

  const [showPreloader, setShowPreloader] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Show app content before preloader ends
    const appTimer = setTimeout(() => setShowApp(true), PRELOADER_DURATION - APP_REVEAL_BEFORE);
    // Hide preloader after full duration
    const preloaderTimer = setTimeout(() => setShowPreloader(false), PRELOADER_DURATION);
    return () => {
      clearTimeout(appTimer);
      clearTimeout(preloaderTimer);
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader onLoadingComplete={() => {}} />}
      {showApp && (
        <Router>
          <ScrollProvider>
            <CartProvider>
              <div className="App">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </div>
            </CartProvider>
          </ScrollProvider>
        </Router>
      )}
    </>
  );
}

export default App; 