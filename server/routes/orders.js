const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const fs = require('fs');

// GET all orders (with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { status, email, page = 1, limit = 10, sort = 'createdAt:desc' } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (email) {
      query['customer.email'] = email.toLowerCase();
    }
    
    const [sortField, sortOrder] = sort.split(':');
    const sortObj = { [sortField]: sortOrder === 'desc' ? -1 : 1 };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('items.productId', 'name imageUrl');
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + orders.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId', 'name imageUrl description');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// POST create new order
router.post('/', [
  body('customer.firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('customer.lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('customer.email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customer.phone').trim().isLength({ min: 1 }).withMessage('Phone number is required'),
  body('shippingAddress.address').trim().isLength({ min: 1 }).withMessage('Address is required'),
  body('shippingAddress.city').trim().isLength({ min: 1 }).withMessage('City is required'),
  body('shippingAddress.state').trim().isLength({ min: 1 }).withMessage('State is required'),
  body('shippingAddress.zipCode').trim().isLength({ min: 1 }).withMessage('ZIP code is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').isMongoId().withMessage('Valid product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    console.log('=== ORDER REQUEST RECEIVED ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Validate products and calculate totals
    const orderData = req.body;
    let subtotal = 0;
    
    for (const item of orderData.items) {
      console.log('Processing item:', item);
      const product = await Product.findById(item.productId);
      if (!product) {
        console.log('Product not found for ID:', item.productId);
        return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
      }
      
      // Check if size is provided
      if (!item.size) {
        console.log('Size missing for product:', product.name);
        return res.status(400).json({ message: `Size is required for ${product.name}` });
      }
      
      // Remove size and stock checks
      // item.name = product.name;
      // item.price = product.price;
      subtotal += product.price * item.quantity;
      // Remove stock decrement
    }
    
    // Calculate tax and shipping
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over 100
    const total = subtotal + shipping;
    
    const order = new Order({
      ...orderData,
      subtotal,
      shipping,
      total
    });
    
    await order.save();
    
    // Save order to file
    fs.appendFile('orders.txt', JSON.stringify(order) + '\n', err => {
      if (err) console.error('Failed to write order to file:', err);
    });
    
    console.log('Order created successfully:', order.orderNumber);
    res.status(201).json({
      message: 'Order created successfully',
      orderNumber: order.orderNumber,
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// PUT update order status
router.put('/:id/status', [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
  body('trackingNumber').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const updateData = { status: req.body.status };
    if (req.body.trackingNumber) {
      updateData.trackingNumber = req.body.trackingNumber;
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// PUT update payment status
router.put('/:id/payment', [
  body('paymentStatus').isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.paymentStatus },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
});

// GET order statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const avgOrderValue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, avg: { $avg: '$total' } } }
    ]);
    
    res.json({
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      averageOrderValue: avgOrderValue.length > 0 ? Math.round(avgOrderValue[0].avg * 100) / 100 : 0
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({ message: 'Error fetching order statistics' });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Restore product stock if order was not cancelled
    if (order.status !== 'cancelled') {
      for (const item of order.items) {
        if (item.size) {
          // Restore stock for specific size
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { 'sizes.$[size].stock': item.quantity }
          }, {
            arrayFilters: [{ 'size.size': item.size }]
          });
        } else {
          // Fallback to old stock field if size is not specified
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: item.quantity }
          });
        }
      }
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
});

module.exports = router; 