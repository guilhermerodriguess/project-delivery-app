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

  async updateOrderStatus(id, status) {
    try {
    const [rowsUpdated] = await Sale.update(
      { status },
      { where: { id } },
    );
    if (rowsUpdated === 0) {
      throw new Error('Pedido não encontrado.');
    }
    return { id, status };
  } catch (error) {
    throw new Error('Ocorreu um erro ao atualizar o status do pedido.');
  }
  },
};

module.exports = OrderService;
