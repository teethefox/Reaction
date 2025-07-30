import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen.jsx';
import './App.css';

import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductDetailPage from './components/ProductDetailPage';
import SpinningModelOnScroll from './components/SpinningModelOnScroll';
import ScrollRevealSection from './components/ScrollRevealSection';
import AnimatedImagePair from './components/AnimatedImagePair';
import ProductScroller from './components/ProductScroller';
import CartDrawer from './components/CartDrawer';
import AnimatedImageGallery from './components/AnimatedImageGallery';
import InteractiveHeader from './components/InteractiveHeader';
import FloatingParticles from './components/FloatingParticles';
import ErrorBoundary from './ErrorBoundary';
import Scientist from './assets/scientistcrop.mp4';
import FeaturedFlavorSection from './components/FeaturedFlavorSection';
import FlavorBenefitsSection from './FlavorBenefitsSection';
import InstagramStaticFeed from './components/InstagramStaticFeed.jsx';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);
  const spawnTriggerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <InteractiveHeader onCartClick={() => setCartOpen(true)} />
          {/* <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} /> */}

          <Routes>
            <Route path="/" element={<MainContent spawnTriggerRef={spawnTriggerRef} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

// 🧱 Move rest of the scrollable layout into a separate component
const MainContent = ({ spawnTriggerRef }) => (
  <>
    <Hero />

    <ScrollRevealSection direction="up">
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4rem 2rem',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div style={{ flex: '1', paddingRight: '2rem' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#071952',
            lineHeight: '1.2',
            margin: 0,
          }}>
            Unlike other energy drinks,
            <br />
            it's clinically dosed for real results.
          </h1>
        </div>
        <div style={{ flex: '1', height: '100%', display: 'flex', alignItems: 'center' }}>
          <video
            src={Scientist}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center -20%',
              borderRadius: '12px',
            }}
          />
        </div>
      </section>
    </ScrollRevealSection>

    <ScrollRevealSection>
      <div id="shop">
        <ProductList />
      </div>
    </ScrollRevealSection>



    <ScrollRevealSection>
      <ErrorBoundary>
      <section id="floating-zone" className="floating-zone">
        <h1 className="floating-zone-heading">
          Formulated by experts, used by pros
        </h1>
        <div ref={spawnTriggerRef}>
          <FloatingParticles spawnRef={spawnTriggerRef} />
        </div>
      </section>
      </ErrorBoundary>
    </ScrollRevealSection>

    <ScrollRevealSection>
      <div className="mt-12">
        <AnimatedImageGallery />
      </div>
    </ScrollRevealSection>

    <section>
      <h1 className="middle-text">
        An elevated energy drink experience for your elevated lifestyle.
      </h1>
    </section>

    <ScrollRevealSection>
      <section className="whitespace">
        <FlavorBenefitsSection />
      </section>
    </ScrollRevealSection>

    <ScrollRevealSection>
      <InstagramStaticFeed />
    </ScrollRevealSection>
  <ScrollRevealSection>
    <Footer />
  </ScrollRevealSection>
  </>

);

export default App;
