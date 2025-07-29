import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, checkoutUrl, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const tax = (parseFloat(subtotal) * 0.07).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween' }}
    >
      <button onClick={onClose} className="text-right mb-4 font-bold">Close ✖</button>
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>

      {cart.length === 0 ? (
        <p className="text-gray-500">0</p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
              <div className="flex-1">
                <p>{item.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.variantId)}>🗑</button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 font-semibold">Subtotal: ${subtotal}</div>
      <div className="text-sm text-gray-600">Tax: ${tax}</div>
      <div className="font-bold">Total: ${total}</div>

      <button onClick={onClose} className="mt-2 bg-blue-100 text-blue-700 py-2 rounded">Continue Shopping</button>

      {checkoutUrl && (
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 bg-blue-600 text-white text-center py-2 rounded block"
        >
          Checkout
        </a>
      )}
    </motion.div>
  );
};

export default CartDrawer;
