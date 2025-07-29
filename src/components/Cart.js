import React, { useEffect, useState } from 'react';
import client from './ShopifyClient'; // make sure this is the file above

const Cart = () => {
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const newCheckout = await client.checkout.create();
        setCheckout(newCheckout);
      } catch (err) {
        console.error('Shopify Checkout Create Error:', err);
      }
    };

    fetchCheckout();
  }, []);

  return (
    <div>
      🛒 {checkout?.lineItems?.length || 0}
    </div>
  );
};

export default Cart;
