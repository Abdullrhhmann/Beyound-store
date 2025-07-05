const mongoose = require('mongoose');
const Order = require('./models/Order');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modern-ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Get database info
const getDatabaseInfo = async () => {
  try {
    console.log('\n=== DATABASE INFORMATION ===\n');
    
    // Get Products
    console.log('📦 PRODUCTS:');
    console.log('============');
    const products = await Product.find({});
    if (products.length === 0) {
      console.log('No products found in database.');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Price: ${new Intl.NumberFormat('en-EG', {
          style: 'currency',
          currency: 'EGP',
        }).format(product.price)}`);
        console.log(`   Description: ${product.description || 'No description'}`);
        console.log(`   Image URL: ${product.imageUrl || 'No image'}`);
        console.log(`   Video URL: ${product.videoUrl || 'No video'}`);
        console.log(`   Created: ${product.createdAt}`);
        console.log('');
      });
    }
    
    console.log('\n📋 ORDERS:');
    console.log('===========');
    const orders = await Order.find({}).sort({ createdAt: -1 });
    if (orders.length === 0) {
      console.log('No orders found in database.');
    } else {
      orders.forEach((order, index) => {
        console.log(`${index + 1}. Order #${order.orderNumber}`);
        console.log(`   ID: ${order._id}`);
        console.log(`   Customer: ${order.customer.firstName} ${order.customer.lastName}`);
        console.log(`   Email: ${order.customer.email}`);
        console.log(`   Phone: ${order.customer.phone}`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Total: ${order.formattedTotal}`);
        console.log(`   Items: ${order.items.length} item(s)`);
        order.items.forEach((item, itemIndex) => {
          console.log(`     ${itemIndex + 1}. ${item.quantity}x ${item.name} - ${new Intl.NumberFormat('en-EG', {
            style: 'currency',
            currency: 'EGP',
          }).format(item.price)}`);
        });
        console.log(`   Shipping Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`);
        console.log(`   Created: ${order.createdAt}`);
        console.log('');
      });
    }
    
    console.log('\n📊 SUMMARY:');
    console.log('===========');
    console.log(`Total Products: ${products.length}`);
    console.log(`Total Orders: ${orders.length}`);
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    console.log(`Total Revenue: ${new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(totalRevenue)}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error fetching database info:', error);
    process.exit(1);
  }
};

// Run the script
getDatabaseInfo(); 