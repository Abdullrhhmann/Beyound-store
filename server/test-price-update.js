const https = require('https');
const http = require('http');

const productIds = [
  '686935b8f06d450e5136742d', // Quarter Zipper
  '686935b8f06d450e5136742e', // Pants
  '686935b8f06d450e5136742f', // Shirt
];

function updateProductPrice(productId, newPrice) {
  const data = JSON.stringify({ price: newPrice });
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/products/${productId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        const updatedProduct = JSON.parse(responseData);
        console.log(`✅ Price updated successfully!`);
        console.log(`Product: ${updatedProduct.name}`);
        console.log(`New Price: EGP ${updatedProduct.price}`);
      } else {
        console.error(`❌ Failed to update price: ${res.statusCode}`);
        console.error(responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error updating price:', error.message);
  });

  req.write(data);
  req.end();
}

console.log('🔄 Updating all product prices to EGP 100...');
productIds.forEach(id => updateProductPrice(id, 100)); 