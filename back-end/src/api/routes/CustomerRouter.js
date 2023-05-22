const express = require('express');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');

const customerRouter = express.Router();

customerRouter.get('/products', ProductController.getProducts);
customerRouter.post('/orders', OrderController.createOrder);
customerRouter.get('/orders/:userId', OrderController.getOrders);
customerRouter.put('/orders/:id', OrderController.updateOrderStatus);
customerRouter.get('/order/:id', OrderController.getOrderById);

module.exports = customerRouter;