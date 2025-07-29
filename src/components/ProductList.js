import React, { useEffect, useState, useRef, useCallback } from 'react';
import Client from 'shopify-buy';
import ProductModal from './ProductModal';
import './ProductList.css';

const shopifyClient = Client.buildClient({
  domain: 'drinkreaction.com',
  storefrontAccessToken: 'cb114ea73ea6635c8b15becb6ae22fa7',
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const loader = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopifyProducts = await shopifyClient.product.fetchAll();
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Infinite scroll handler
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + 4);
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section id="shop" className="floating-product-section">
      <div className="floating-grid">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="floating-product"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.images?.[0]?.src || ''}
              alt={product.title}
              className="floating-img"
            />
            <h3 className="floating-title">{product.title}</h3>
            <p className="floating-price">${product.variants?.[0]?.price?.amount || 'N/A'}</p>
          </div>
        ))}
      </div>

      <div ref={loader} style={{ height: '1px' }} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductList;
