import ShopifyBuy from 'shopify-buy';
const SHOPIFY_DOMAIN = 'drinkreaction.com';
const STOREFRONT_ACCESS_TOKEN = 'cb114ea73ea6635c8b15becb6ae22fa7';
const client = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
});

export default client;
