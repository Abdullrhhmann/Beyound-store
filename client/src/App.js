import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ScrollProvider } from './contexts/ScrollContext';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboard from './pages/AdminDashboard';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Preloader onLoadingComplete={handleLoadingComplete} />
      {!isLoading && (
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