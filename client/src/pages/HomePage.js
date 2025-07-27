import React, { useState, useEffect } from 'react';
import CartDrawer from '../components/CartDrawer';
import HeroSection from '../components/HeroSection';
import SlidingTextSeparator from '../components/SlidingTextSeparator';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import BackgroundGradientAnimation from '../components/BackgroundGradientAnimation';
import AboutSection from '../components/AboutSection';
import ProductSection from '../components/ProductSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AnimatedBallsComponent from '../components/balls';

const HomePage = () => {
  // State for products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    if (!API_URL) {
      setError("API configuration error. Please contact support.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = `${API_URL}/products`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the nested response format from the API
        const productsArray = data.products || (Array.isArray(data) ? data : []);
        
        // Transform the API data to match the expected format
        const transformedProducts = productsArray.map(product => ({
          id: product._id,
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          rating: 5,
          features: product.features || [
            "Premium cotton blend",
            "Modern fit", 
            "Zippers all over for easy dressing and removal",
            "Accessible design for people with disabilities"
          ]
        }));
        
        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading state
  if (loading) {
    return null; // Return null instead of showing loading screen
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-red-400 text-xl text-center">
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent m-0 p-0">
      <BackgroundGradientAnimation />
      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation />
        <CartDrawer />
        <main className="flex-1 m-0 p-0 flex flex-col">
          <div className="section-container" id="hero">
            <HeroSection />
          </div>
          
          {/* ABOUT SECTION - Wrapped with id for navigation */}
          <div>
            <SlidingTextSeparator text="ABOUT US" />
            <div id="about"></div>
            <AboutSection />
          </div>
           <SlidingTextSeparator text="Our Partners" />
          <div className="section-container">
            <AnimatedBallsComponent />
          </div>

          <SlidingTextSeparator text="OUR PRODUCTS" />
          {/* Product Sections */}
          
          <div className="max-w-6xl mx-auto px-0 pt-12 pb-4" id="products">
          </div>
          
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <div
                className="section-container py-16 sm:py-20 lg:py-24 -mt-1"
                id={`products-${product.name.toLowerCase()}`}
              >
                <ProductSection 
                  product={product} 
                  index={index}
                />
              </div>
            </React.Fragment>
          ))}
          
          <SlidingTextSeparator  text="TESTIMONIALS" />
          <div id="TESTIMONIALS"></div>
          {/* Testimonials Section */}
          <TestimonialsSection  />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage; 