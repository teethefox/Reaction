import React, { useState, useEffect } from 'react';
import './InteractiveHeader.css';
import logo from '../assets/logo4.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const InteractiveHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, checkoutUrl } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`reaction-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="reaction-header__content">
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>

          <div className={`reaction-logo ${scrolled ? 'shrink' : ''}`}>
            <a href="#top" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}>
              <img src={logo} alt="Logo" />
            </a>
          </div>

          <nav className={`reaction-nav desktop-nav ${menuOpen ? 'open' : ''}`}>
            <a href="#shop" onClick={closeMenu}>PRODUCTS</a>
            <a href="#about" onClick={closeMenu}>ABOUT</a>
            <a href="#faqs" onClick={closeMenu}>FAQS</a>
            <a href="#contact" onClick={closeMenu}>CONTACT</a>    
            <a href="#cart" onClick={() => {
              setCartOpen(true);
              closeMenu();
            }}>CART</a>
          </nav>

        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <img src={logo} alt="Logo" className="mobile-logo" />
              <button className="close-btn" onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <ul className="mobile-links">
              <li><a href="#shop" onClick={closeMenu}>PRODUCTS</a></li>
              <li><a href="#about" onClick={closeMenu}>ABOUT</a></li>
              <li><a href="#faqs" onClick={closeMenu}>FAQS</a></li>
              <li><a href="#contact" onClick={closeMenu}>CONTACT</a></li>
              <li><a href="#cart" onClick={() => { setCartOpen(true); closeMenu(); }}>CART {totalItems > 0 && `(${totalItems})`}</a></li>
            </ul>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="cart-popup-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>{item.title} × {item.quantity}</li>
                ))}
              </ul>
            )}
            <a href={checkoutUrl} className="checkout-btn" target="_blank" rel="noopener noreferrer">
              Go to Checkout
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveHeader;
