# Modern E-commerce Website

A full-stack e-commerce website built with React frontend and Node.js backend, featuring modern UI/UX design, mobile responsiveness, and complete order management system.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX** with smooth animations and transitions
- **Mobile Responsive** design that works perfectly on all devices
- **Interactive Product Showcase** with video backgrounds
- **Shopping Cart** with real-time updates
- **Checkout System** with form validation
- **Admin Dashboard** for order management
- **Testimonials Section** with horizontal scrolling
- **Animated Components** using Framer Motion

### Backend (Node.js + Express)
- **RESTful API** for products, orders, and testimonials
- **MongoDB Database** with Mongoose ODM
- **Order Management** with validation and stock tracking
- **Product Management** with size variants
- **CORS Configuration** for cross-origin requests
- **Environment Variables** for secure configuration

### Key Features
- ✅ **Mobile-First Design**
- ✅ **Real-time Cart Updates**
- ✅ **Size Selection** for products
- ✅ **Order Tracking**
- ✅ **Admin Dashboard**
- ✅ **Responsive Navigation**
- ✅ **Smooth Animations**
- ✅ **Database Integration**

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Context API** - State Management

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-Origin Resource Sharing
- **Express Validator** - Input Validation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd website-beyound
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cd server
   cp env.example .env
   ```

4. **Configure Environment Variables**
   Edit `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=5000
   NODE_ENV=development
   ```

5. **Database Setup**
   ```bash
   cd server
   node setup-database.js
   node seed-products.js
   node seed-testimonials.js
   ```

6. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts both frontend (port 3000) and backend (port 5000) concurrently.

### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start backend
cd ../server
npm start
```

## 📱 Mobile Access

To access the website from mobile devices on the same network:

1. **Find your computer's IP address**
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Update API URLs** in `client/src/App.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
   ```

3. **Access from mobile**:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 🗄️ Database Structure

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  sizes: [
    {
      size: String,  // 'S', 'M', 'L'
      stock: Number
    }
  ],
  images: [String],
  videos: [String]
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String,
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    size: String
  }],
  totalAmount: Number,
  paymentStatus: String,
  orderStatus: String,
  createdAt: Date
}
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Testimonials
- `GET /api/testimonials` - Get testimonials
- `POST /api/testimonials` - Add testimonial

## 🎨 Customization

### Styling
- Modify `client/src/index.css` for global styles
- Update `client/tailwind.config.js` for Tailwind configuration
- Edit component files for specific styling

### Content
- Update product data in `server/seed-products.js`
- Modify testimonials in `server/seed-testimonials.js`
- Change images in `client/src/assets/`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Heroku
1. Create Heroku app
2. Add MongoDB addon
3. Configure environment variables
4. Deploy using Git

### Other Platforms
- **Netlify** - For frontend
- **Railway** - For full-stack
- **DigitalOcean** - For custom deployment

## 📝 Scripts

### Development
- `npm run dev` - Start development servers
- `npm run client` - Start frontend only
- `npm run server` - Start backend only

### Database
- `node setup-database.js` - Initialize database
- `node seed-products.js` - Seed products
- `node seed-testimonials.js` - Seed testimonials
- `node check-current-products.js` - Check products

### Utilities
- `node update-products-with-sizes.js` - Add sizes to products
- `node drop-all-orders.js` - Clear orders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Abdulrahman Karkour**
- Email: abdullrhhmann@gmail.com
- GitHub: [Your GitHub]

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
- MongoDB for the database solution 