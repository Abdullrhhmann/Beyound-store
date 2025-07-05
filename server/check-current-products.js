const mongoose = require('mongoose');
require('dotenv').config();

// Import the Product model
const Product = require('./models/Product');

async function checkCurrentProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Get all products
    const products = await Product.find({});
    
    console.log(`\n=== CURRENT PRODUCTS (${products.length} total) ===`);
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Price: ${product.formattedPrice}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Current sizes: ${product.sizes ? product.sizes.map(s => `${s.size}(${s.stock})`).join(', ') : 'None'}`);
      console.log(`   Total stock: ${product.totalStock}`);
    });

    // Check for products with invalid sizes
    const invalidSizes = products.filter(product => 
      product.sizes && product.sizes.some(size => !['S', 'M', 'L'].includes(size.size))
    );

    if (invalidSizes.length > 0) {
      console.log(`\n⚠️  PRODUCTS WITH INVALID SIZES (${invalidSizes.length}):`);
      invalidSizes.forEach(product => {
        const invalidSizeObjects = product.sizes.filter(size => !['S', 'M', 'L'].includes(size.size));
        console.log(`   - ${product.name}: ${invalidSizeObjects.map(s => s.size).join(', ')}`);
      });
    } else {
      console.log('\n✅ All products have valid sizes (S, M, L only)');
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCurrentProducts(); 