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
};

module.exports = SellerController;
