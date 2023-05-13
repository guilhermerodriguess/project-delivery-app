const express = require('express');
const ProductController = require('../controllers/ProductController');

const productRouter = express.Router();

// Rota para buscar todos os produtos
productRouter.get('/products', ProductController.getProducts);

module.exports = productRouter;
