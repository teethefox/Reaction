
// MiniCartIcon.js
import React from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';

export default function MiniCartIcon({ onClick }) {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="cart-icon" onClick={onClick}>
      🛒
      {count > 0 && <span className="cart-count">{count}</span>}
    </button>
  );
}

// CartDrawer.js
import React from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, checkoutUrl, removeFromCart, updateQuantity } = useCart();

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={onClose}>×</button>
      </div>
      <div className="cart-items">
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map(item => (
          <div key={item.variantId} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
              <div className="qty-controls">
                <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.variantId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="cart-footer">
          <a href={checkoutUrl} className="checkout-btn" target="_blank" rel="noopener noreferrer">
            Proceed to Checkout →
          </a>
        </div>
      )}
    </div>
  );
}
