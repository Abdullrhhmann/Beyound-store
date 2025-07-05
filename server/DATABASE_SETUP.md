# Database Setup Guide

This guide will help you set up the database for your e-commerce website backend.

## Prerequisites

1. **MongoDB** - You need MongoDB installed and running
   - **Local MongoDB**: Install MongoDB Community Edition
   - **MongoDB Atlas**: Create a free cloud database
   - **Docker**: Run MongoDB in a container

2. **Node.js** - Make sure you have Node.js installed (version 14 or higher)

## Quick Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the server directory:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/modern-ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 3. Run Database Setup
```bash
npm run setup
```

This will:
- Connect to your MongoDB database
- Create necessary indexes
- Check existing collections
- Provide setup status

### 4. Seed Sample Data
```bash
# Seed products only
npm run seed:products

# Seed testimonials only
npm run seed

# Seed both products and testimonials
npm run seed:all
```

### 5. Start the Server
```bash
npm run dev
```

## MongoDB Options

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/modern-ecommerce`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env` file with your Atlas connection string

### Option 3: Docker MongoDB
```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Use connection string: mongodb://localhost:27017/modern-ecommerce
```

## Database Schema

### Products Collection
- **name**: Product name (required)
- **description**: Product description (required)
- **price**: Price in Egyptian Pounds (required)
- **rating**: Product rating (1-5, default: 5)
- **features**: Array of product features
- **category**: Product category (clothing, electronics, etc.)
- **imageUrl**: Product image URL
- **stock**: Available stock quantity
- **isActive**: Product availability status
- **tags**: Array of product tags

### Testimonials Collection
- **name**: Customer name
- **rating**: Rating (1-5)
- **comment**: Customer review
- **isActive**: Review visibility status

### Orders Collection
- **customer**: Customer information
- **items**: Array of ordered items
- **total**: Order total in EGP
- **status**: Order status
- **paymentStatus**: Payment status

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/categories/list` - List categories

### Testimonials
- `GET /api/testimonials` - List all testimonials
- `POST /api/testimonials` - Create new testimonial

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order

## Troubleshooting

### Connection Issues
1. **MongoDB not running**: Start MongoDB service
2. **Wrong connection string**: Check your `.env` file
3. **Network issues**: Check firewall settings
4. **Authentication**: Ensure proper credentials

### Data Issues
1. **No products showing**: Run `npm run seed:products`
2. **No testimonials**: Run `npm run seed`
3. **Index errors**: Run `npm run setup` to recreate indexes

### Common Errors
- **ECONNREFUSED**: MongoDB not running
- **Authentication failed**: Wrong credentials
- **Network timeout**: Check internet connection (for Atlas)

## Development Tips

1. **Use MongoDB Compass** for visual database management
2. **Enable MongoDB logs** for debugging
3. **Use environment variables** for different environments
4. **Backup your data** regularly
5. **Monitor database performance** in production

## Production Considerations

1. **Use MongoDB Atlas** for production
2. **Set up proper authentication**
3. **Configure backups**
4. **Set up monitoring**
5. **Use connection pooling**
6. **Implement proper error handling**

## Support

If you encounter issues:
1. Check the console logs
2. Verify MongoDB is running
3. Check your `.env` configuration
4. Ensure all dependencies are installed
5. Try running the setup script again 