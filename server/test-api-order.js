console.log('Node.js script is running!');

console.log('Starting test-api-order.js...');

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const testOrder = {
  customer: {
    firstName: 'API',
    lastName: 'Test',
    email: 'api@test.com',
    phone: '9876543210'
  },
  shippingAddress: {
    address: '456 API St',
    city: 'Alexandria',
    state: 'Alexandria',
    zipCode: '54321'
  },
  items: [
    {
      productId: '686935b8f06d450e5136742e',
      quantity: 1
    }
  ],
  paymentStatus: 'pending'
};

async function testAPIOrder() {
  try {
    console.log('Testing API order creation...');
    console.log('Payload:', JSON.stringify(testOrder, null, 2));
    
    const response = await fetch('http://localhost:5000/apimage.pngi/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testOrder)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API Order created successfully!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.error('❌ API Order creation failed:');
      console.error('Status:', response.status);
      console.error('Data:', JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ API Order creation failed:');
    console.error('Error:', error.message);
  }
}

testAPIOrder(); 