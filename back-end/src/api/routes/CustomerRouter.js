const express = require('express');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');

const customerRouter = express.Router();

customerRouter.put('/', OrderController.getUserId);
customerRouter.get('/products', ProductController.getProducts);
customerRouter.post('/orders', OrderController.createOrder);
customerRouter.put('/orders', OrderController.getOrders);
customerRouter.get('/orders/:id', OrderController.getOrdersById);

module.exports = customerRouter;
