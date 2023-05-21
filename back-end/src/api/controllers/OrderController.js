const OrderService = require('../services/OrderService');

const OrderController = {
  async createOrder(req, res) {
    try {
      const { order } = req.body;
      const orderId = await OrderService.createOrder(order);
      res.status(201).json({ orderId });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  async getUserId(req, res) {
    try {
      const { name, email } = req.body; 
      const userId = await OrderService.getUserId(name, email);
      res.status(200).json({ userId }); 
    } catch (error) {
      console.error('Error getting user id:', error);
      res.status(500).json({ error: 'Failed to get user id' });
    }
  },

  async getOrders(req, res) {
    try {
      const { user } = req.body;
      const { name, email } = user;
      const userId = await OrderService.getUserId(name, email);
      const orders = await OrderService.getOrders(userId);
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ error: 'Failed to get orders' });
    }
  },

  async getOrdersById(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrdersById(id);
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
      await OrderService.updateOrderStatus(id, status);
    
      res.status(200).json({ id, status });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = OrderController;
