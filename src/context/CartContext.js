import React, { createContext, useContext, useEffect, useState } from 'react';
import Client from 'shopify-buy';

const SHOPIFY_DOMAIN = 'drinkreaction.myshopify.com'; // ✅ must be full domain, not just 'drinkreaction.com'
const STOREFRONT_ACCESS_TOKEN = 'cb114ea73ea6635c8b15becb6ae22fa7';

// ✅ Shopify client setup
const shopifyClient = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
});

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutId, setCheckoutId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  // ✅ Initialize checkout on first load
  useEffect(() => {
    const initCheckout = async () => {
      try {
        const storedId = localStorage.getItem('checkoutId');
        let checkout;

        if (storedId) {
          checkout = await shopifyClient.checkout.fetch(storedId);

          if (checkout.completedAt) {
            // If the checkout was already completed, start fresh
            checkout = await shopifyClient.checkout.create();
            localStorage.setItem('checkoutId', checkout.id);
          }
        } else {
          checkout = await shopifyClient.checkout.create();
          localStorage.setItem('checkoutId', checkout.id);
        }

        setCheckoutId(checkout.id);
        setCheckoutUrl(checkout.webUrl);
      } catch (err) {
        console.error('Error initializing checkout:', err);
      }
    };

    initCheckout();
  }, []);

  // ✅ Add product to cart and update Shopify checkout
  const addToCart = async (variantId, item) => {
    if (!checkoutId) return;

    try {
      await shopifyClient.checkout.addLineItems(checkoutId, [
        { variantId, quantity: 1 },
      ]);

      setCart((prev) => {
        const existing = prev.find((i) => i.variantId === variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...item, variantId, quantity: 1 }];
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // ✅ Remove from cart and checkout
  const removeFromCart = async (variantId) => {
    if (!checkoutId) return;

    try {
      const checkout = await shopifyClient.checkout.fetch(checkoutId);
      const lineItem = checkout.lineItems.find(
        (li) => li.variant.id === variantId
      );

      if (lineItem) {
        await shopifyClient.checkout.removeLineItems(checkoutId, [lineItem.id]);
        setCart((prev) => prev.filter((item) => item.variantId !== variantId));
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // ✅ Update quantity in cart
  const updateQuantity = async (variantId, quantity) => {
    if (!checkoutId || quantity < 1) return;

    try {
      const checkout = await shopifyClient.checkout.fetch(checkoutId);
      const lineItem = checkout.lineItems.find(
        (li) => li.variant.id === variantId
      );

      if (lineItem) {
        await shopifyClient.checkout.updateLineItems(checkoutId, [
          { id: lineItem.id, quantity },
        ]);
        setCart((prev) =>
          prev.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checkoutUrl,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCart must be used within a CartProvider');
  return context;
};
