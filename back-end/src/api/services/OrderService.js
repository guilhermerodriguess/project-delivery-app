const { User, Sale, SalesProduct } = require('../../database/models');

const createSale = async (order) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = order;
  try {
    const sale = await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: new Date(),
      status: 'Pendente',
    });
    return sale;
  } catch (error) {
    throw new Error('Failed to create sale');
  }
};

const createSalesProducts = async (saleId, products) => {
  try {
    const salesProducts = products.map((product) => ({
      saleId,
      productId: product.productId,
      quantity: product.quantity,
    }));
    await SalesProduct.bulkCreate(salesProducts);
  } catch (error) {
    console.error('Error creating sales products:', error);
    throw new Error('Failed to create sales products');
  }
};

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
};

module.exports = OrderService;
