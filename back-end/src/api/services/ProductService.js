const { Product } = require('../../database/models');

const ProductService = {
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new Error('Erro ao buscar os produtos');
    }
  },
};

module.exports = ProductService;
