const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { body, validationResult } = require('express-validator');

// GET all approved testimonials
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, productId } = req.query;
    
    let query = { isApproved: true };
    
    if (productId) {
      query.productId = productId;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Testimonial.countDocuments(query);
    
    res.json({
      testimonials,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + testimonials.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Error fetching testimonials' });
  }
});

// GET single testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ message: 'Error fetching testimonial' });
  }
});

// POST create new testimonial
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('quote').trim().isLength({ min: 1, max: 500 }).withMessage('Quote is required and must be less than 500 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('productId').optional().isMongoId().withMessage('Invalid product ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    
    res.status(201).json({
      message: 'Testimonial submitted successfully! It will be reviewed and approved soon.',
      testimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Error creating testimonial' });
  }
});

// PUT update testimonial (admin only)
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be less than 100 characters'),
  body('quote').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Quote must be less than 500 characters'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('isApproved').optional().isBoolean().withMessage('isApproved must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Error updating testimonial' });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Error deleting testimonial' });
  }
});

// GET testimonials statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await Testimonial.countDocuments();
    const approved = await Testimonial.countDocuments({ isApproved: true });
    const pending = await Testimonial.countDocuments({ isApproved: false });
    
    const avgRating = await Testimonial.aggregate([
      { $match: { isApproved: true } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    
    res.json({
      total,
      approved,
      pending,
      averageRating: avgRating.length > 0 ? Math.round(avgRating[0].avgRating * 10) / 10 : 0
    });
  } catch (error) {
    console.error('Error fetching testimonial stats:', error);
    res.status(500).json({ message: 'Error fetching testimonial statistics' });
  }
});

module.exports = router; 