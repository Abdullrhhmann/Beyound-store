const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample product data with Egyptian Pound prices
const products = [
  {
    name: 'Quarter Zipper',
    description: 'Premium quarter zipper jacket with modern design and comfortable fit. Perfect for casual and semi-formal occasions.',
    price: 850, // EGP
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
    price: 650, // EGP
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
    price: 450, // EGP
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

// Connect to MongoDB
mongoose.connect('mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/?retryWrites=true&w=majority&appName=beyound', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

// Seed products function
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Display seeded products
    insertedProducts.forEach(product => {
      console.log(`- ${product.name}: ${product.price} EGP`);
    });

    console.log('Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeding
seedProducts(); 