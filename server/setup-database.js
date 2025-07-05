const mongoose = require('mongoose');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const Order = require('./models/Order');
require('dotenv').config();

console.log('🚀 Starting Database Setup...\n');

// Database connection function
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/modern-ecommerce';
    console.log(`📡 Connecting to MongoDB: ${mongoURI}`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running locally');
    console.log('2. Check your .env file has correct MONGODB_URI');
    console.log('3. If using MongoDB Atlas, check your connection string');
    console.log('4. Ensure your IP is whitelisted (if using cloud MongoDB)\n');
    return false;
  }
};

// Create indexes function
const createIndexes = async () => {
  try {
    console.log('📊 Creating database indexes...');
    
    // Product indexes
    await Product.createIndexes();
    console.log('✅ Product indexes created');
    
    // Testimonial indexes
    await Testimonial.createIndexes();
    console.log('✅ Testimonial indexes created');
    
    // Order indexes
    await Order.createIndexes();
    console.log('✅ Order indexes created');
    
    console.log('✅ All indexes created successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
    return false;
  }
};

// Check collections function
const checkCollections = async () => {
  try {
    console.log('🔍 Checking database collections...');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log('📋 Available collections:');
    collectionNames.forEach(name => {
      console.log(`   - ${name}`);
    });
    
    if (collectionNames.length === 0) {
      console.log('   (No collections found - this is normal for a new database)');
    }
    
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ Error checking collections:', error.message);
    return false;
  }
};

// Check data function
const checkData = async () => {
  try {
    console.log('📈 Checking existing data...');
    
    const productCount = await Product.countDocuments();
    const testimonialCount = await Testimonial.countDocuments();
    const orderCount = await Order.countDocuments();
    
    console.log(`📦 Products: ${productCount}`);
    console.log(`💬 Testimonials: ${testimonialCount}`);
    console.log(`📋 Orders: ${orderCount}`);
    
    if (productCount === 0) {
      console.log('\n💡 No products found. Run "npm run seed:products" to add sample products.');
    }
    
    if (testimonialCount === 0) {
      console.log('💡 No testimonials found. Run "npm run seed" to add sample testimonials.');
    }
    
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ Error checking data:', error.message);
    return false;
  }
};

// Main setup function
const setupDatabase = async () => {
  console.log('🎯 Database Setup Checklist:\n');
  
  // Step 1: Connect to database
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }
  
  // Step 2: Create indexes
  const indexesCreated = await createIndexes();
  if (!indexesCreated) {
    console.log('⚠️  Warning: Some indexes may not have been created');
  }
  
  // Step 3: Check collections
  await checkCollections();
  
  // Step 4: Check existing data
  await checkData();
  
  // Step 5: Provide next steps
  console.log('🎉 Database setup completed!\n');
  console.log('📝 Next steps:');
  console.log('1. Create a .env file with your configuration (copy from env.example)');
  console.log('2. Run "npm run seed:products" to add sample products');
  console.log('3. Run "npm run seed" to add sample testimonials');
  console.log('4. Run "npm run dev" to start the development server');
  console.log('5. Test your API endpoints at http://localhost:5000/api/health\n');
  
  console.log('🔗 Useful API endpoints:');
  console.log('   - GET /api/health - Server health check');
  console.log('   - GET /api/products - List all products');
  console.log('   - GET /api/testimonials - List all testimonials');
  console.log('   - GET /api/products/categories/list - List product categories\n');
  
  // Close connection
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
  process.exit(0);
};

// Run setup
setupDatabase().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
}); 