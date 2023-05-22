const express = require('express');
const ProductController = require('../controllers/ProductController');
const CustomerController = require('../controllers/CustomerController');

const customerRouter = express.Router();

customerRouter.get('/products', ProductController.getProducts);
customerRouter.post('/orders', CustomerController.createOrder);
customerRouter.get('/orders/:userId', CustomerController.getOrders);
customerRouter.put('/orders/:id', CustomerController.updateOrderStatus);
customerRouter.get('/order/:id', CustomerController.getOrderById);

module.exports = customerRouter;