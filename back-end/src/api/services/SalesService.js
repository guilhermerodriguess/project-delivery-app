const { Sale, SalesProduct } = require('../../database/models');

const SalesService = {
  async createSale(order) {
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
  },
  
  async createSalesProducts(saleId, products) {
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
  },

  async getSales(id) {
    try {
      const salesProducts = await Sale.findAll({
         where: { id }, 
         include: [{ model: SalesProduct }],
        });
      return salesProducts;
    } catch (error) {
      console.error('Error getting sales products:', error);
      throw new Error('Failed to get sales products');
    }
  },

};

module.exports = SalesService;