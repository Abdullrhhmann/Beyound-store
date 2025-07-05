const mongoose = require('mongoose');
require('dotenv').config();

const Order = require('./models/Order');

async function dropAllOrders() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const result = await Order.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} orders from the database.`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

dropAllOrders(); 