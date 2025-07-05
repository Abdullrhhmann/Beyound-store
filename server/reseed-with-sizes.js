const mongoose = require('mongoose');
require('dotenv').config();

// Import the Product model
const Product = require('./models/Product');

const productsWithSizes = [
  {
    name: "Quarter Zipper",
    description: "High-quality quarter zipper jacket perfect for any occasion. Made with premium materials for comfort and style.",
    price: 400,
    rating: 4.8,
    features: [
      "Premium cotton blend",
      "Comfortable fit",
      "Multiple color options",
      "Durable zipper"
    ],
    category: "clothing",
    imageUrl: "/assets/images/quarterzibber-thumpnail.jpg",
    videoUrl: "/assets/videos/quarter zipper.mp4",
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 15 }
    ],
    tags: ["jacket", "zipper", "casual", "premium"]
  },
  {
    name: "Pants",
    description: "Comfortable and stylish pants designed for everyday wear. Perfect fit with modern design.",
    price: 450,
    rating: 4.6,
    features: [
      "Comfortable fit",
      "Breathable material",
      "Modern design",
      "Easy care"
    ],
    category: "clothing",
    imageUrl: "/assets/images/pants-thumpnail.jpg",
    videoUrl: "/assets/videos/pants.mp4",
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 16 }
    ],
    tags: ["pants", "casual", "comfortable", "modern"]
  },
  {
    name: "Shirt",
    description: "Classic shirt with contemporary styling. Perfect for both casual and formal occasions.",
    price: 350,
    rating: 4.7,
    features: [
      "Classic design",
      "Versatile styling",
      "Quality fabric",
      "Easy maintenance"
    ],
    category: "clothing",
    imageUrl: "/assets/images/shirt-thumpnail.jpg",
    videoUrl: "/assets/videos/shirt.mp4",
    sizes: [
      { size: 'S', stock: 14 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 12 }
    ],
    tags: ["shirt", "classic", "versatile", "quality"]
  }
];

async function reseedWithSizes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products with sizes
    const insertedProducts = await Product.insertMany(productsWithSizes);
    console.log(`✅ Inserted ${insertedProducts.length} products with S, M, L sizes`);

    // Show the new products
    console.log('\n=== NEW PRODUCTS WITH SIZES ===');
    insertedProducts.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Price: ${product.formattedPrice}`);
      console.log(`   Sizes: ${product.sizes.map(s => `${s.size}(${s.stock})`).join(', ')}`);
      console.log(`   Total stock: ${product.totalStock}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

reseedWithSizes(); 