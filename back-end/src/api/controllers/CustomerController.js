const CustomerService = require('../services/CustomerService');

const CustomerController = {
  async createOrder(req, res) {
    try {
      const { order } = req.body;
      const orderId = await CustomerService.createOrder(order);
      res.status(201).json({ orderId });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  async getOrders(req, res) {
    try {
      const { userId } = req.params;
      const orders = await CustomerService.getOrders(userId);
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ error: 'Failed to get orders' });
    }
  },

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await CustomerService.getOrderById(id);
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error getting order by id:', error);
      res.status(500).json({ error: 'Failed to get order by id' });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await CustomerService.updateOrderStatus(id, status);
    
      res.status(200).json({ id, status });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = CustomerController;
