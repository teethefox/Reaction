import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://drinkreaction.com/api/2023-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'cb114ea73ea6635c8b15becb6ae22fa7',
      },
      body: JSON.stringify({
        query: `
          query {
            node(id: "${id}") {
              ... on Product {
                id
                title
                description
                images(first: 5) {
                  edges {
                    node {
                      transformedSrc
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
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
        `
      })
    })
    .then(res => res.json())
    .then(data => setProduct(data.data.node))
    .catch(console.error);
  }, [id]);

  if (!product) return <div>Loading product...</div>;

  return (
    <div className="product-detail-page">
      <h1>{product.title}</h1>
      <img
        src={product.images.edges[0]?.node.transformedSrc}
        alt={product.title}
        style={{ width: '300px' }}
      />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.variants.edges[0]?.node.price.amount}</p>
    </div>
  );
}
