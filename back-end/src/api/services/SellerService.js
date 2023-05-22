const { User, Sale } = require('../../database/models');

const SellerService = {
  async getAllSellers() {
    try {
      const sellers = await User.findAll({
        where: {
          role: 'seller',
        },
        attributes: ['id', 'name'],
      });
      return sellers;
    } catch (error) {
      throw new Error('Failed to get sellers');
    }
  },

  async getSellerById(id) {
    try {
      const seller = await User.findOne({
        where: {
          id,
          role: 'seller',
        },
        attributes: ['name'],
      });
      return seller;
    } catch (error) {
      throw new Error('Failed to get seller');
    }
  },

  async getAllOrders(userId) {
    try {
      const orders = await Sale.findAll({
        where: {
          sellerId: userId,
        },
        attributes: ['id', 'status', 'saleDate', 'totalPrice', 'deliveryAddress'],
      });
      return orders;
    } catch (error) {
      throw new Error('Failed to get orders');
    }
  },
};

module.exports = SellerService;
