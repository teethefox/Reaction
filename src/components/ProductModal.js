import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const variantId = product?.variants?.[0]?.id;

  if (!product) return null;

  const variant = product.variants?.edges?.[0]?.node;
  const image = product.images?.edges?.[0]?.node?.transformedSrc;
  const pricePerUnit = parseFloat(product.variant?.price?.amount || 0);
  const totalPrice = (pricePerUnit * quantity).toFixed(2);
  const handleAddToCart = () => {
    const variantId = product?.variants?.[0]?.id;
    if (!variantId) {
      console.warn('Variant ID not available');
      return;
    }
  
    if (onAddToCart && typeof onAddToCart === 'function') {
      onAddToCart(variantId, quantity);
    } else {
      console.warn('onAddToCart is not defined');
    }
  };
  
  
  return (
    <Dialog open={true} onClose={onClose} className="product-modal-outer">
      <div className="product-modal-overlay" aria-hidden="true" />
      <div className="product-modal-container">
        <DialogPanel className="product-modal-panel">

          {/* Product Image */}
          <img src={product.images[0]?.src} alt={product.title} className="product-modal-image" />

          {/* Product Title */}
          <h2 className="product-modal-title">{product.title}</h2>

          {/* Tabs */}
          <div className="product-modal-tabs">
            {["description", "ingredients", "flavor"].map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`tab-button ${tab === key ? "active" : ""}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="product-modal-tab-content">
            {tab === "description" && (
              <p>{product.description || "No description available."}</p>
            )}
            {tab === "ingredients" && (
              <ul>
                <li>Caffeine Anhydrous</li>
                <li>L-Theanine</li>
                <li>Electrolytes</li>
                <li>B Vitamins</li>
              </ul>
            )}
            {tab === "flavor" && (
              <p>Bright citrus with berry notes, lightly carbonated and ultra crisp.</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="quantity-price-container">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <p className="product-modal-price">${totalPrice}</p>
          </div>

          {/* Buttons */}
          <div className="modal-button-row">
            <a
              href={`https://drinkreaction.com/products/${product.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shopify-link"
            >
              View on Shopify
            </a>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
