const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  quote: {
    type: String,
    required: true,
    maxlength: 500
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
testimonialSchema.index({ isApproved: 1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema); 