const mongoose = require('mongoose');
const Order = require('./models/Order');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/?retryWrites=true&w=majority&appName=beyound', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for testing'))
.catch(err => console.error('MongoDB connection error:', err));

// Test order data
const testOrder = {
  customer: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '0123456789'
  },
  shippingAddress: {
    address: '123 Test St',
    city: 'Cairo',
    state: 'Cairo',
    zipCode: '12345',
    country: 'Egypt'
  },
  items: [
    {
      productId: '686935b8f06d450e5136742e', // Pants product ID
      quantity: 2
    }
  ],
  paymentStatus: 'pending',
  status: 'pending'
};

// Create test order
const createTestOrder = async () => {
  try {
    console.log('Creating test order...');
    
    // Validate products and calculate totals
    let subtotal = 0;
    
    for (const item of testOrder.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        console.error(`Product with ID ${item.productId} not found`);
        return;
      }
      
      item.name = product.name;
      item.price = product.price;
      subtotal += product.price * item.quantity;
      
      console.log(`Product: ${product.name}, Price: ${product.price} EGP, Quantity: ${item.quantity}`);
    }
    
    // Calculate tax and shipping
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over 100 EGP
    const total = subtotal + tax + shipping;
    
    console.log(`Subtotal: ${subtotal} EGP`);
    console.log(`Tax: ${tax} EGP`);
    console.log(`Shipping: ${shipping} EGP`);
    console.log(`Total: ${total} EGP`);
    
    const order = new Order({
      ...testOrder,
      subtotal,
      tax,
      shipping,
      total
    });
    
    await order.save();
    
    console.log('✅ Order created successfully!');
    console.log('Order Number:', order.orderNumber);
    console.log('Order ID:', order._id);
    console.log('Customer:', order.customer.firstName, order.customer.lastName);
    console.log('Total:', order.total, 'EGP');
    
    // Verify order is in database
    const savedOrder = await Order.findById(order._id);
    if (savedOrder) {
      console.log('✅ Order verified in database!');
    } else {
      console.log('❌ Order not found in database!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating order:', error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`  ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

// Run the test
createTestOrder(); 