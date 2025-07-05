# Modern E-Commerce Website

A fully responsive, modern e-commerce website with smooth animations, dynamic scrolling, and full-stack functionality.

## 🚀 Features

### Frontend
- **Smooth Scrolling**: Full-page vertical scrolling with GSAP animations
- **Dynamic Background Colors**: Background changes as you scroll through product sections
- **Floating Navigation**: Sticky navigation with cart functionality
- **Product Sections**: 3 full-screen product sections with dynamic gradients
- **Shopping Cart**: Slide-out cart drawer with quantity controls
- **Testimonials**: Swiper.js carousel with smooth swipe interactions
- **Checkout Process**: Complete checkout flow with form validation
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern Animations**: Framer Motion and GSAP for smooth transitions

### Backend
- **RESTful API**: Complete CRUD operations for products, orders, testimonials
- **MongoDB Integration**: Mongoose models with validation
- **User Authentication**: JWT-based authentication system
- **Order Management**: Complete order processing with status tracking
- **Payment Integration**: Ready for Stripe integration
- **Security**: Helmet, CORS, rate limiting, input validation

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations and smooth scrolling
- **Swiper.js** - Touch slider for testimonials
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment example
   cd server
   cp env.example .env
   
   # Edit .env file with your configuration
   nano .env
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

5. **Run the application**
   ```bash
   # From root directory
   npm run dev
   
   # Or run separately:
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm start
   ```

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `PUT /api/testimonials/:id` - Update testimonial

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 🎨 Design Features

### Smooth Scrolling
- GSAP ScrollTrigger for smooth section transitions
- Dynamic background color changes
- Parallax effects on hero section

### Product Sections
- Each product has its own full-screen section
- Dynamic gradient backgrounds (purple-pink, blue-cyan, green-emerald)
- Centered product displays with glass morphism effects

### Animations
- Entrance animations using Framer Motion
- Hover effects and micro-interactions
- Floating elements and particle effects
- Smooth cart drawer animations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🛒 E-Commerce Features

### Shopping Cart
- Add/remove items
- Quantity controls
- Real-time total calculation
- Persistent cart (localStorage)
- Smooth drawer animations

### Checkout Process
- Multi-step form validation
- Order summary
- Shipping information
- Payment integration ready
- Order confirmation

### Product Management
- Product catalog with search
- Category filtering
- Rating system
- Stock management
- Image handling

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/modern-ecommerce
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Custom animations
- Glass morphism utilities
- Responsive breakpoints

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your platform
```

### Database
- Use MongoDB Atlas for cloud database
- Set up proper indexes for performance
- Configure backup and monitoring

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🎯 Roadmap

- [ ] Admin dashboard
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Social media integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] PWA features
- [ ] Multi-language support

---

Built with ❤️ using modern web technologies 