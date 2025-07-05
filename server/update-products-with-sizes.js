const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = require('./models/Product');

async function updateProductsWithSizes() {
  try {
    console.log('Connected to MongoDB');
    
    // Get all products
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);
    
    for (const product of products) {
      // Add sizes if they don't exist
      if (!product.sizes || product.sizes.length === 0) {
        const sizes = [
          { size: 'S', stock: Math.floor(product.stock / 3) || 10 },
          { size: 'M', stock: Math.floor(product.stock / 3) || 15 },
          { size: 'L', stock: Math.floor(product.stock / 3) || 10 }
        ];
        
        product.sizes = sizes;
        await product.save();
        
        console.log(`✅ Updated ${product.name} with sizes:`, sizes);
      } else {
        console.log(`ℹ️  ${product.name} already has sizes:`, product.sizes);
      }
    }
    
    console.log('✅ All products updated successfully!');
    
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

updateProductsWithSizes(); 