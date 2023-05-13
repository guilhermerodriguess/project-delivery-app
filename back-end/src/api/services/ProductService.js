const { Product } = require('../../database/models');

const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao buscar os produtos');
  }
};

module.exports = {
  getAllProducts,
};
