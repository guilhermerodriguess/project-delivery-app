const SellerService = require('../services/SellerService');

const SellerController = {
  async getAllSellers(req, res) {
    try {
      const sellers = await SellerService.getAllSellers();
      res.status(200).json(sellers);
    } catch (error) {
      console.error('Error getting sellers:', error);
      res.status(500).json({ error: 'Failed to get sellers' });
    }
  },

  async getAllOrders(req, res) {
    const { userId } = req.params;
    try {
      const orders = await SellerService.getAllOrders(Number(userId));
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get orders' });
    }
  },

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await SellerService.getOrderById(id);
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error getting order by id:', error);
      res.status(500).json({ error: 'Failed to get order by id' });
    }
  },
  
};

module.exports = SellerController;
