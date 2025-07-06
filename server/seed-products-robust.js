const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Product data
const products = [
  {
    name: 'Quarter Zipper',
    description: 'Premium quarter zipper jacket with modern design and comfortable fit. Perfect for casual and semi-formal occasions.',
    price: 850,
    rating: 4.8,
    features: [
      'High-quality zipper material',
      'Comfortable fit',
      'Modern design',
      'Durable construction',
      'Easy to maintain'
    ],
    category: 'clothing',
    imageUrl: '/assets/product-images/quarterzibber-thumpnail.jpg',
    stock: 50,
    isActive: true,
    tags: ['jacket', 'zipper', 'casual', 'modern']
  },
  {
    name: 'Pants',
    description: 'Stylish and comfortable pants designed for everyday wear. Made with premium fabric for maximum comfort and durability.',
    price: 650,
    rating: 4.6,
    features: [
      'Premium fabric material',
      'Comfortable waistband',
      'Perfect fit design',
      'Easy care fabric',
      'Versatile styling'
    ],
    category: 'clothing',
    imageUrl: '/assets/product-images/pants-thumpnail.jpg',
    stock: 75,
    isActive: true,
    tags: ['pants', 'casual', 'comfortable', 'versatile']
  },
  {
    name: 'Shirt',
    description: 'Classic shirt with contemporary styling. Perfect for both casual and formal occasions with superior comfort.',
    price: 450,
    rating: 4.7,
    features: [
      'Breathable cotton material',
      'Classic collar design',
      'Comfortable fit',
      'Easy iron fabric',
      'Versatile styling'
    ],
    category: 'clothing',
    imageUrl: '/assets/product-images/shirt-thumpnail.jpg',
    stock: 100,
    isActive: true,
    tags: ['shirt', 'cotton', 'classic', 'formal']
  }
];

// Connection options to try
const connectionOptions = [
  {
    name: 'MongoDB Atlas',
    uri: 'mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/beyound-db?retryWrites=true&w=majority&appName=beyound'
  },
  {
    name: 'Environment Variable',
    uri: process.env.MONGODB_URI
  },
  {
    name: 'Local MongoDB',
    uri: 'mongodb://localhost:27017/beyound-db'
  }
];

async function tryConnection(connectionOption) {
  if (!connectionOption.uri) {
    console.log(`Skipping ${connectionOption.name} - no URI provided`);
    return false;
  }

  console.log(`\nTrying to connect to ${connectionOption.name}...`);
  console.log(`URI: ${connectionOption.uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);

  try {
    await mongoose.connect(connectionOption.uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ Successfully connected to ${connectionOption.name}!`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to connect to ${connectionOption.name}:`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function seedProducts() {
  console.log('🌱 Starting product seeding process...\n');

  // Try each connection option
  let connected = false;
  for (const option of connectionOptions) {
    if (await tryConnection(option)) {
      connected = true;
      break;
    }
  }

  if (!connected) {
    console.log('\n❌ Could not connect to any MongoDB instance.');
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB is running locally: mongod');
    console.log('2. Check your internet connection');
    console.log('3. Verify your MongoDB Atlas credentials');
    console.log('4. Check if your IP is whitelisted in Atlas');
    process.exit(1);
  }

  try {
    // Clear existing products
    console.log('\n🗑️  Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Existing products cleared');

    // Insert new products
    console.log('\n📦 Inserting new products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);

    // Display seeded products
    console.log('\n📋 Seeded Products:');
    insertedProducts.forEach(product => {
      console.log(`   - ${product.name}: ${product.price} EGP`);
    });

    console.log('\n🎉 Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedProducts(); 