const { User, Sale, SalesProduct, Product } = require('../../database/models');
const { createSale, createSalesProducts } = require('./SalesService');

const OrderService = {
  async createOrder(order) {
    try {
      const sale = await createSale(order);
      await createSalesProducts(sale.id, order.products);
      return sale.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },

  async getUserId(name, email) {
    try {
      const user = await User.findOne({
        where: {
          name,
          email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user.id;
    } catch (error) {
      console.error('Error getting user id:', error);
      throw new Error('Failed to get user id');
    }
  },

  async getOrders(id) {
    try {
      const orders = await Sale.findAll({
        where: {
          userId: id,
        },
      });
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw new Error('Failed to get orders');
    }
  },

  async getOrdersById(id) {
    try {
      const order = await Sale.findAll({
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

module.exports = OrderService;
