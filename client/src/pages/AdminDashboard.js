import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundBeams from '../components/BackgroundBeams';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // New order form state
  const [newOrder, setNewOrder] = useState({
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    shippingAddress: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Egypt'
    },
    items: [],
    status: 'pending'
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
      const data = await response.json();
      const ordersArray = data.orders || (Array.isArray(data) ? data : []);
      setOrders(ordersArray);
    } catch (error) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await response.json();
      const productsArray = data.products || (Array.isArray(data) ? data : []);
      setProducts(productsArray);
      setLoading(false);
    } catch (error) {
      setProducts([]);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders();
        alert('Order status updated successfully!');
      }
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        fetchOrders();
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete order');
      }
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  const createOrder = async () => {
    // Validate required fields
    if (!newOrder.customer.firstName || !newOrder.customer.lastName || !newOrder.customer.email || !newOrder.customer.phone) {
      alert('Please fill in all customer information fields');
      return;
    }
    
    if (!newOrder.shippingAddress.address || !newOrder.shippingAddress.city || !newOrder.shippingAddress.state || !newOrder.shippingAddress.zipCode) {
      alert('Please fill in all shipping address fields');
      return;
    }
    
    if (newOrder.items.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }
    
    // Validate each item has required fields
    for (let i = 0; i < newOrder.items.length; i++) {
      const item = newOrder.items[i];
      if (!item.productId || !item.size || item.quantity < 1) {
        alert(`Please fill in all fields for item ${i + 1} (product, size, and quantity)`);
        return;
      }
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      
      if (response.ok) {
        const result = await response.json();
        fetchOrders();
        setShowCreateOrderModal(false);
        setNewOrder({
          customer: { firstName: '', lastName: '', email: '', phone: '' },
          shippingAddress: { address: '', city: '', state: '', zipCode: '', country: 'Egypt' },
          items: [],
          status: 'pending'
        });
        alert(`Order created successfully! Order #: ${result.orderNumber}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to create order: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Failed to create order: ' + error.message);
    }
  };

  const updateProductPrice = async (productId, newPrice) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseFloat(newPrice) })
      });
      if (response.ok) {
        fetchProducts();
        alert('Product price updated successfully!');
      }
    } catch (error) {
      alert('Failed to update product price');
    }
  };

  const addItemToNewOrder = () => {
    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, name: '', price: 0, size: '' }]
    }));
  };

  const removeItemFromNewOrder = (index) => {
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateNewOrderItem = (index, field, value) => {
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'productId') {
            const product = products.find(p => p._id === value);
            if (product) {
              updatedItem.name = product.name;
              updatedItem.price = product.price;
            }
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'processing': return 'bg-blue-600';
      case 'shipped': return 'bg-purple-600';
      case 'delivered': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={e => setLoginUsername(e.target.value)}
            className="mb-4 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            className="mb-4 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loginError && <div className="text-red-500 mb-4 text-center">{loginError}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent m-0 p-0">
      <BackgroundBeams />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage orders and product prices</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Products ({products.length})
            </button>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'orders' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Orders Management</h2>
                  <button
                    onClick={() => setShowCreateOrderModal(true)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    + Create New Order
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Order #</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Items</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Time</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orders || []).map((order) => (
                        <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4 font-mono">{order.orderNumber}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div>{order.customer?.firstName} {order.customer?.lastName}</div>
                              <div className="text-gray-400 text-xs">{order.customer?.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              {(order.items || []).map((item, index) => (
                                <div key={index} className="text-gray-300">
                                  {item.quantity}x {item.name} {item.size && `(${item.size})`}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono">{order.formattedTotal}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderModal(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs transition-colors"
                              >
                                View
                              </button>
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => deleteOrder(order._id)}
                                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Products Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Current Price</th>
                        <th className="text-left py-3 px-4">New Price</th>
                        <th className="text-left py-3 px-4">Sizes & Stock</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(products || []).map((product) => (
                        <tr key={product._id} className="border-b border-gray-700">
                          <td className="py-3 px-4">
                            <div className="font-medium">{product.name}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {product.description}
                          </td>
                          <td className="py-3 px-4 font-mono">
                            {new Intl.NumberFormat('en-EG', {
                              style: 'currency',
                              currency: 'EGP',
                            }).format(product.price)}
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              defaultValue={product.price}
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-24"
                              placeholder="New price"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              {product.sizes && product.sizes.length > 0 ? (
                                <div className="space-y-1">
                                  {product.sizes.map((size, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <span className="font-medium">{size.size}:</span>
                                      <span className="text-gray-400">{size.stock}</span>
                                    </div>
                                  ))}
                                  <div className="text-xs text-gray-500 mt-1">
                                    Total: {product.totalStock || 0}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-500">No sizes</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  const newPrice = e.target.closest('tr').querySelector('input[type="number"]').value;
                                  if (newPrice && newPrice !== product.price) {
                                    updateProductPrice(product._id, newPrice);
                                  }
                                }}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                              >
                                Update Price
                              </button>
                              <button
                                onClick={() => {
                                  // Add size management functionality here
                                  alert('Size management coming soon!');
                                }}
                                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition-colors"
                              >
                                Manage Sizes
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderModal && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowOrderModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Order Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Order Number:</span>
                        <div className="font-mono">{selectedOrder.orderNumber}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Created At:</span>
                        <div>{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ''}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Total:</span>
                        <div className="font-mono text-lg">{selectedOrder.formattedTotal}</div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Name:</span>
                        <div>{selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>
                        <div>{selectedOrder.customer?.email}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Phone:</span>
                        <div>{selectedOrder.customer?.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                    <div className="text-sm">
                      <div>{selectedOrder.shippingAddress?.street}</div>
                      <div>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</div>
                      <div>{selectedOrder.shippingAddress?.country}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {(selectedOrder.items || []).map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-400">
                              Quantity: {item.quantity}
                              {item.size && <span className="ml-2">• Size: {item.size}</span>}
                            </div>
                          </div>
                          <div className="font-mono">
                            {new Intl.NumberFormat('en-EG', {
                              style: 'currency',
                              currency: 'EGP',
                            }).format(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Order Modal */}
        <AnimatePresence>
          {showCreateOrderModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateOrderModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Create New Order</h2>
                  <button
                    onClick={() => setShowCreateOrderModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={newOrder.customer.firstName}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          customer: { ...prev.customer, firstName: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={newOrder.customer.lastName}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          customer: { ...prev.customer, lastName: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={newOrder.customer.email}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          customer: { ...prev.customer, email: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={newOrder.customer.phone}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          customer: { ...prev.customer, phone: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Address"
                        value={newOrder.shippingAddress.address}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, address: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newOrder.shippingAddress.city}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, city: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newOrder.shippingAddress.state}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, state: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={newOrder.shippingAddress.zipCode}
                        onChange={(e) => setNewOrder(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, zipCode: e.target.value }
                        }))}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">Order Items</h3>
                      <button
                        onClick={addItemToNewOrder}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {newOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded">
                          <select
                            value={item.productId}
                            onChange={(e) => updateNewOrderItem(index, 'productId', e.target.value)}
                            className="bg-gray-600 border border-gray-500 rounded px-2 py-1 flex-1"
                          >
                            <option value="">Select Product</option>
                            {products.map(product => (
                              <option key={product._id} value={product._id}>
                                {product.name} - EGP {product.price}
                              </option>
                            ))}
                          </select>
                          <select
                            value={item.size || ''}
                            onChange={(e) => updateNewOrderItem(index, 'size', e.target.value)}
                            className="bg-gray-600 border border-gray-500 rounded px-2 py-1 w-16"
                          >
                            <option value="">Size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                          </select>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateNewOrderItem(index, 'quantity', parseInt(e.target.value))}
                            className="bg-gray-600 border border-gray-500 rounded px-2 py-1 w-20"
                          />
                          <div className="font-mono text-sm">
                            EGP {(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItemFromNewOrder(index)}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      Total: EGP {newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowCreateOrderModal(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createOrder}
                      disabled={
                        !newOrder.customer.firstName || 
                        !newOrder.customer.lastName || 
                        !newOrder.customer.email || 
                        !newOrder.customer.phone ||
                        !newOrder.shippingAddress.address ||
                        !newOrder.shippingAddress.city ||
                        !newOrder.shippingAddress.state ||
                        !newOrder.shippingAddress.zipCode ||
                        newOrder.items.length === 0 ||
                        newOrder.items.some(item => !item.productId || !item.size || item.quantity < 1)
                      }
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded"
                    >
                      Create Order
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard; 