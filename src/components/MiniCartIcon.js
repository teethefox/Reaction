// src/components/MiniCartIcon.js
import React from 'react';
import { useCart } from '../context/CartContext';
import './MiniCartIcon.css'; // optional for styles

const MiniCartIcon = ({ onClick }) => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mini-cart-icon" onClick={onClick}>
      <span role="img" aria-label="cart" className="cart-emoji">🛒</span>
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </div>
  );
};

export default MiniCartIcon;
