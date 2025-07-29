import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

const SHOPIFY_DOMAIN = 'drinkreaction.com';
const STOREFRONT_ACCESS_TOKEN = 'cb114ea73ea6635c8b15becb6ae22fa7';

const QUERY = `
{
  products(first: 6) {
    edges {
      node {
        id
        title
        description
        images(first: 1) {
          edges {
            node {
              transformedSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              availableForSale
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}`;

const ProductScroller = () => {
  const [products, setProducts] = useState([]);
  const [scrollDone, setScrollDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollerRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((res) => res.json())
      .then((json) => {
        const items = json.data.products.edges.map((edge) => {
          const node = edge.node;
          return {
            id: node.id,
            title: node.title,
            description: node.description,
            image: node.images.edges[0]?.node.transformedSrc,
            available: node.variants.edges[0]?.node.availableForSale,
            price: parseFloat(node.variants.edges[0]?.node.price.amount),
          };
        });

        const multiplied = Array(5).fill(null).flatMap(() => items);
        setProducts(multiplied);
      });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    const handleWheel = (e) => {
      if (!scroller || scrollDone) return;

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const isEnd = scroller.scrollLeft >= maxScroll - 10;

      if (!isEnd) {
        e.preventDefault();
        scroller.scrollLeft += e.deltaY;
      } else {
        setScrollDone(true);
      }
    };

    const handleScroll = () => {
      if (!scroller) return;
      const max = scroller.scrollWidth - scroller.clientWidth;
      const percent = (scroller.scrollLeft / max) * 100;
      setScrollProgress(percent);
      if (percent >= 99) setScrollDone(true);
    };

    if (!scrollDone) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    scroller?.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      scroller?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDone]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let startX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!scrollDone) {
        const moveX = e.touches[0].clientX;
        scroller.scrollLeft -= (moveX - startX);
        startX = moveX;
      }
    };

    scroller.addEventListener('touchstart', handleTouchStart);
    scroller.addEventListener('touchmove', handleTouchMove);

    return () => {
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollDone]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleAddToCart = (product) => {
    addToCart(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      quantity: 1,
      price: product.price,
    });
  };

  return (
    <div>
      {!scrollDone && (
        <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all" style={{ width: `${scrollProgress}%` }} />
      )}

        <div
          className="overflow-hidden h-screen relative"
          style={{
            backgroundImage: "url('/reaction_pattern_bg.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px auto',
          }}
        >
        {!scrollDone && (
          <button
            onClick={() => setScrollDone(true)}
            className="absolute top-4 right-4 bg-white text-blue-600 border border-blue-600 px-4 py-1 rounded shadow z-50 hover:bg-blue-600 hover:text-white transition"
          >
            Skip →
          </button>
        )}

        <div
          ref={scrollerRef}
          className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-8 py-12 h-full items-start"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 border p-4 rounded shadow snap-start flex flex-col"
            >
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-3"
              />
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="text-sm mb-1">
                <strong>Price:</strong> {formatter.format(product.price)}
              </div>
              <div className={`mb-3 text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.available}
                className={`$${
                  product.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                } text-white px-4 py-2 rounded mt-auto`}
              >
                {product.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Down Arrow after scroll */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        {scrollDone && (
          <button
            onClick={() => {
              document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition"
            aria-label="Scroll to next section"
          >
            ↓
          </button>
        )}
      </div>

      {scrollDone && (
        <div className="px-8 py-20 bg-gray-100" id="next-section">
          <h2 className="text-3xl font-bold mb-6">Welcome to Reaction</h2>
          <p className="max-w-3xl text-lg">
            You’ve explored our products — now continue scrolling to learn more about what makes
            Reaction different.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductScroller;
