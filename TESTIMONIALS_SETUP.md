# Testimonials Section Setup Guide

## Overview
The testimonials section features 10 poker card-style cards arranged in 2 rows of 5 cards each. Each card has a 3D flip animation on hover, revealing the testimonial content on the back.

## Features
- **Poker Card Design**: Cards look like playing cards with spade symbols and blue gradient background
- **3D Flip Animation**: Smooth 180-degree rotation on hover using CSS transforms
- **Responsive Layout**: Adapts to different screen sizes (5 cards per row on desktop, 2 on tablet, 1 on mobile)
- **Dynamic Content**: Fetches testimonials from the API with fallback to static data
- **Loading State**: Shows a spinner while fetching data

## Setup Instructions

### 1. Database Setup
Make sure MongoDB is running and create a `.env` file in the server directory:

```bash
# Copy the example environment file
cp server/env.example server/.env

# Edit the .env file with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/modern-ecommerce
```

### 2. Seed the Database
Run the seeding script to add sample testimonials:

```bash
cd server
npm run seed
```

This will add 10 sample testimonials to the database.

### 3. Start the Server
```bash
cd server
npm install
npm run dev
```

The server will start on port 5000.

### 4. Start the Client
```bash
cd client
npm install
npm start
```

The client will start on port 3000 and proxy API requests to the server.

## How It Works

### Card Structure
Each card has two sides:
1. **Front (Back of Poker Card)**: Blue gradient background with spade symbols and the person's name
2. **Back (Testimonial Content)**: White background with the testimonial quote, rating, and name

### Animation
- Uses CSS `transform-style: preserve-3d` for 3D transforms
- `backface-visibility: hidden` to hide the opposite side during rotation
- `perspective: 1000px` for realistic 3D effect
- Smooth transition with `duration-700` (700ms)

### Responsive Design
- **Desktop (lg+)**: 5 cards per row
- **Tablet (md)**: 2 cards per row  
- **Mobile**: 1 card per row

### API Integration
- Fetches testimonials from `/api/testimonials?limit=10`
- Only shows approved testimonials (`isApproved: true`)
- Falls back to static data if API is unavailable

## Customization

### Adding New Testimonials
1. Via API: POST to `/api/testimonials` with name, quote, email, and rating
2. Via Database: Directly insert into MongoDB with `isApproved: true`

### Styling Changes
- Card colors: Modify the `from-blue-600 via-blue-700 to-blue-800` classes
- Animation speed: Change `duration-700` to desired duration
- Card size: Adjust the `h-64` class for height

### Adding More Cards
- Update the grid layout in the component
- Add more testimonials to the database
- Modify the slice operations (`slice(0, 5)` and `slice(5, 10)`)

## Troubleshooting

### Cards Not Flipping
- Ensure Tailwind CSS is properly configured with the custom utilities
- Check that the 3D transform classes are included in the build

### API Not Working
- Verify the server is running on port 5000
- Check the proxy configuration in `client/package.json`
- Ensure MongoDB is connected and testimonials exist

### Styling Issues
- Make sure all Tailwind classes are included in the build
- Check that the custom CSS in the `<style jsx>` block is applied

## Browser Support
- Modern browsers with CSS 3D transforms support
- IE11 and older browsers may not support the 3D flip animation
- Graceful degradation to static cards on unsupported browsers 