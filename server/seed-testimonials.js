const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');
require('dotenv').config();

const sampleTestimonials = [
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "sarah.johnson@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "michael.chen@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "emily.rodriguez@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "david.thompson@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "lisa.wang@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "alex.martinez@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "rachel.green@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "james.wilson@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "maria.garcia@example.com",
    isApproved: true
  },
  {
    name: "abdullrhman",
    quote: "hello, world",
    rating: 5,
    email: "tom.anderson@example.com",
    isApproved: true
  }
];

async function seedTestimonials() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modern-ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials');
    
    // Insert sample testimonials
    const insertedTestimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`Successfully inserted ${insertedTestimonials.length} testimonials`);
    
    // Display the inserted testimonials
    console.log('\nInserted testimonials:');
    insertedTestimonials.forEach((testimonial, index) => {
      console.log(`${index + 1}. ${testimonial.name}: "${testimonial.quote.substring(0, 50)}..."`);
    });
    
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedTestimonials(); 