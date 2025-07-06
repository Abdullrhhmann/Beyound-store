const mongoose = require('mongoose');
const Product = require('./models/Product');
const Testimonial = require('./models/Testimonial');
const Order = require('./models/Order');
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

// Testimonial data
const testimonials = [
  {
    name: "Ahmed Hassan",
    quote: "Amazing quality! The Quarter Zipper is exactly what I was looking for. Perfect fit and great material.",
    rating: 5,
    email: "ahmed.hassan@example.com",
    isApproved: true
  },
  {
    name: "Fatima Ali",
    quote: "The pants are incredibly comfortable and stylish. I wear them to work every day!",
    rating: 5,
    email: "fatima.ali@example.com",
    isApproved: true
  },
  {
    name: "Omar Khalil",
    quote: "Great customer service and fast delivery. The shirt quality exceeded my expectations.",
    rating: 4,
    email: "omar.khalil@example.com",
    isApproved: true
  },
  {
    name: "Layla Mahmoud",
    quote: "Love the modern design of their clothing. Perfect for both casual and formal occasions.",
    rating: 5,
    email: "layla.mahmoud@example.com",
    isApproved: true
  },
  {
    name: "Youssef Ibrahim",
    quote: "Excellent prices for such high-quality clothing. Will definitely shop here again!",
    rating: 5,
    email: "youssef.ibrahim@example.com",
    isApproved: true
  },
  {
    name: "Nour El-Din",
    quote: "The Quarter Zipper jacket is my new favorite. Perfect for the Egyptian weather!",
    rating: 4,
    email: "nour.eldin@example.com",
    isApproved: true
  },
  {
    name: "Mariam Saleh",
    quote: "Fast shipping and the clothes fit perfectly. Highly recommend Beyound Store!",
    rating: 5,
    email: "mariam.saleh@example.com",
    isApproved: true
  },
  {
    name: "Karim Abdel",
    quote: "Great selection of clothing. The pants are so comfortable and stylish.",
    rating: 4,
    email: "karim.abdel@example.com",
    isApproved: true
  }
];

// Connection options
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

async function createSampleOrders(insertedProducts) {
  const sampleOrders = [
    {
      customer: {
        firstName: "Ahmed",
        lastName: "Hassan",
        email: "ahmed.hassan@example.com",
        phone: "+201234567890"
      },
      shippingAddress: {
        address: "123 Main Street",
        city: "Cairo",
        state: "Cairo",
        zipCode: "11511",
        country: "Egypt"
      },
      items: [
        {
          productId: insertedProducts[0]._id, // Quarter Zipper
          name: "Quarter Zipper",
          price: 850,
          quantity: 1,
          size: "M"
        }
      ],
      subtotal: 850,
      tax: 42.5,
      shipping: 50,
      total: 942.5,
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "credit_card",
      trackingNumber: "TRK123456789",
      notes: "Please deliver in the morning"
    },
    {
      customer: {
        firstName: "Fatima",
        lastName: "Ali",
        email: "fatima.ali@example.com",
        phone: "+201234567891"
      },
      shippingAddress: {
        address: "456 Garden Avenue",
        city: "Alexandria",
        state: "Alexandria",
        zipCode: "21500",
        country: "Egypt"
      },
      items: [
        {
          productId: insertedProducts[1]._id, // Pants
          name: "Pants",
          price: 650,
          quantity: 2,
          size: "L"
        },
        {
          productId: insertedProducts[2]._id, // Shirt
          name: "Shirt",
          price: 450,
          quantity: 1,
          size: "M"
        }
      ],
      subtotal: 1750,
      tax: 87.5,
      shipping: 50,
      total: 1887.5,
      status: "shipped",
      paymentStatus: "paid",
      paymentMethod: "credit_card",
      trackingNumber: "TRK987654321",
      notes: "Gift wrapping requested"
    },
    {
      customer: {
        firstName: "Omar",
        lastName: "Khalil",
        email: "omar.khalil@example.com",
        phone: "+201234567892"
      },
      shippingAddress: {
        address: "789 Business District",
        city: "Giza",
        state: "Giza",
        zipCode: "12511",
        country: "Egypt"
      },
      items: [
        {
          productId: insertedProducts[0]._id, // Quarter Zipper
          name: "Quarter Zipper",
          price: 850,
          quantity: 1,
          size: "L"
        }
      ],
      subtotal: 850,
      tax: 42.5,
      shipping: 50,
      total: 942.5,
      status: "processing",
      paymentStatus: "paid",
      paymentMethod: "credit_card",
      notes: "Rush delivery needed"
    }
  ];

  return sampleOrders;
}

async function seedAllData() {
  console.log('🌱 Starting comprehensive data seeding process...\n');

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
    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert products
    console.log('\n📦 Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);

    // Insert testimonials
    console.log('\n💬 Inserting testimonials...');
    const insertedTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`✅ Successfully seeded ${insertedTestimonials.length} testimonials`);

    // Create and insert sample orders
    console.log('\n📋 Creating sample orders...');
    const sampleOrders = await createSampleOrders(insertedProducts);
    const insertedOrders = await Order.insertMany(sampleOrders);
    console.log(`✅ Successfully seeded ${insertedOrders.length} orders`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   - Products: ${insertedProducts.length}`);
    insertedProducts.forEach(product => {
      console.log(`     • ${product.name}: ${product.price} EGP`);
    });
    
    console.log(`   - Testimonials: ${insertedTestimonials.length}`);
    console.log(`   - Orders: ${insertedOrders.length}`);
    insertedOrders.forEach(order => {
      console.log(`     • Order ${order.orderNumber}: ${order.customer.fullName} - ${order.formattedTotal}`);
    });

    console.log('\n🎉 All data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedAllData(); 