import React, { useState, useEffect } from 'react';
import CartDrawer from '../components/CartDrawer';
import HeroSection from '../components/HeroSection';
import SlidingTextSeparator from '../components/SlidingTextSeparator';
import AboutSection from '../components/AboutSection';
import ProductSection from '../components/ProductSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import AnimatedBallsComponent from '../components/balls';
import FloatingLogo from '../components/FloatingLogo';
import AnimatedSectionTitle from '../components/AnimatedSectionTitle';


const HomePage = () => {
  // State for products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from:', 'http://localhost:5000/api/products');
        const response = await fetch('http://localhost:5000/api/products');
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response:', data);
        
        // Handle the nested response format from the API
        const productsArray = data.products || (Array.isArray(data) ? data : []);
        console.log('Products array:', productsArray);
        
        // Transform the API data to match the expected format
        const transformedProducts = productsArray.map(product => ({
          id: product._id,
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
        
        console.log('Transformed products:', transformedProducts);
        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
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
    console.log('Loading products...');
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
      <FloatingLogo />
      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation />
        <CartDrawer />
        <main className="flex-1 m-0 p-0 flex flex-col">
          <div className="section-container" id="hero">
            <HeroSection />
            
          </div>
          
          
          <AnimatedSectionTitle title="ABOUT US" height="200vh" />
          <SlidingTextSeparator text="ABOUT US" />
          <div className="section-container -mt-1" id="about">  
            <AboutSection />
          </div>
          <AnimatedSectionTitle title="OUR PARTNERS" height="200vh" />  
          <div className="section-container my-8">
            <AnimatedBallsComponent />

          </div>
          <SlidingTextSeparator text="BEYOUND" />

          <AnimatedSectionTitle title="PRODUCTS" height="200vh" />
          
          {/* Scroll Reveal Section */}
         
          {/* Partners Bubbles Iframe */}
          {/* <div className="w-full flex justify-center items-center my-8" style={{zIndex: 10, position: 'relative'}}>
            <iframe 
              src="/partners-bubbles.html" 
              height="25%" 
              width="100%" 
              style={{border: 0, zIndex: 10, minHeight: '720px'}} 
              frameBorder="0"
              title="Partners Bubbles"
              allowFullScreen
            />
          </div> */}
          <SlidingTextSeparator text="OUR PRODUCTSS" />
          {/* Product Sections */}
          
          <div className="max-w-6xl mx-auto px-0 pt-12 pb-4" id="products">
          </div>
          {/* <SlidingTextSeparator text="OUR PRODUCTS" /> */}
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
              {/* {index !== products.length - 1 && (
                <SlidingTextSeparator text={product.name.toUpperCase()} />
              )} */}
            </React.Fragment>
          ))}
           <AnimatedSectionTitle title="TESTIMONIALS" height="300vh" />  
          <SlidingTextSeparator text="TESTIMONIALS" />
          {/* Testimonials Section */}
          <div className="section-container" id="testimonials">
            <TestimonialsSection />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage; 