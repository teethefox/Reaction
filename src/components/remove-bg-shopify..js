const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const SHOPIFY_DOMAIN = 'drinkreaction.com';
const SHOPIFY_TOKEN = 'cb114ea73ea6635c8b15becb6ae22fa7';
const REMOVE_BG_API_KEY = 'yCnr2DNFBVmvbnPrWN7HZEXY'; // Replace with yours

const QUERY = `
{
  products(first: 6) {
    edges {
      node {
        id
        title
        images(first: 1) {
          edges {
            node {
              transformedSrc
            }
          }
        }
      }
    }
  }
}`;

async function fetchProducts() {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query: QUERY }),
  });

  const json = await res.json();
  return json.data.products.edges.map(edge => ({
    title: edge.node.title,
    imageUrl: edge.node.images.edges[0]?.node.transformedSrc,
  }));
}

async function removeBackground(imageUrl, filename) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: {
        image_url: imageUrl,
        size: 'auto',
      },
      responseType: 'arraybuffer',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
    });

    const outputPath = path.join(__dirname, 'output', `${filename}.png`);
    fs.writeFileSync(outputPath, response.data);
    console.log(`✅ Saved: ${outputPath}`);
  } catch (err) {
    console.error(`❌ Failed for ${filename}`, err.response?.data || err.message);
  }
}

(async () => {
  const products = await fetchProducts();

  if (!fs.existsSync('./output')) fs.mkdirSync('./output');

  for (const { title, imageUrl } of products) {
    if (imageUrl) {
      const filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      await removeBackground(imageUrl, filename);
    }
  }
})();
