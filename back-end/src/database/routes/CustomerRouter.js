const express = require('express');
const customerController = require('../controllers/CustomerController');

const customerRouter = express.Router();

// Rota para buscar todos os produtos
customerRouter.get('/products', customerController.getProducts);

module.exports = customerRouter;
