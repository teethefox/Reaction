import ShopifyBuy from 'shopify-buy';

const SHOPIFY_DOMAIN =  process.env.REACT_APP_SHOPIFY_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const client = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
});

export default client;
