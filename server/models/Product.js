const mongoose = require('mongoose');

const sizeStockSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L']
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  features: [{
    type: String,
    maxlength: 200
  }],
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'home', 'books', 'other']
  },
  imageUrl: {
    type: String,
    default: null
  },
  videoUrl: {
    type: String,
    default: null
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  sizes: [sizeStockSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    maxlength: 50
  }]
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(this.price);
});

// Virtual for total stock across all sizes
productSchema.virtual('totalStock').get(function() {
  if (this.sizes && this.sizes.length > 0) {
    return this.sizes.reduce((total, sizeStock) => total + sizeStock.stock, 0);
  }
  return this.stock || 0;
});

// Virtual for available sizes
productSchema.virtual('availableSizes').get(function() {
  if (this.sizes && this.sizes.length > 0) {
    return this.sizes.filter(sizeStock => sizeStock.stock > 0).map(sizeStock => sizeStock.size);
  }
  return [];
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema); 