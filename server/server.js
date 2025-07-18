const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://192.168.43.103:3000', 
    'http://192.168.43.154:3000',
    process.env.CLIENT_URL,
    'https://beyound-store-production.up.railway.app',
    'https://beyound-store.railway.app'
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect('mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/beyound-db?retryWrites=true&w=majority&appName=beyound' || 'mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/beyound-db?retryWrites=true&w=majority&appName=beyound', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const productRoutes = require('./routes/products');
const testimonialRoutes = require('./routes/testimonials');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test products endpoint
app.get('/api/test-products', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    products: [
      {
        _id: 'test-1',
        name: 'Test Product',
        description: 'This is a test product',
        price: 100
      }
    ]
  });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler (only for API routes in production)
if (process.env.NODE_ENV !== 'production') {
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 