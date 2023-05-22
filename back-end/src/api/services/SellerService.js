const { User, Sale, SalesProduct, Product } = require('../../database/models');

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

  async getOrderById(id) {
    try {
      const order = await Sale.findOne({
        where: { id },
        include: [
          { model: User, as: 'seller', attributes: ['id', 'name'] },
          { model: SalesProduct, as: 'products', include: [{ model: Product, as: 'product' }] },
        ],
      });

      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      console.error('Error getting order:', error);
      throw new Error('Failed to get order');
    }
  },
};

module.exports = SellerService;
