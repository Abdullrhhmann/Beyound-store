const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modern-ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Get product IDs
const getProductIds = async () => {
  try {
    const products = await Product.find({}, 'name _id');
    console.log('Current products in database:');
    products.forEach(product => {
      console.log(`${product.name}: ${product._id}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }
};

// Run the script
getProductIds(); 