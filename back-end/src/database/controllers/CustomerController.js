const CustomerService = require('../services/CustomerService');

const getProducts = async (req, res) => {
  try {
    const products = await CustomerService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getProducts,
};
