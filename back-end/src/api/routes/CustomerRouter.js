const express = require('express');
const ProductController = require('../controllers/ProductController');
const CustomerController = require('../controllers/CustomerController');
const authMiddleware = require('../middleware/authMiddleware');

const customerRouter = express.Router();

customerRouter.get('/products', authMiddleware, ProductController.getProducts);
customerRouter.post('/orders', authMiddleware, CustomerController.createOrder);
customerRouter.get('/orders/:userId', authMiddleware, CustomerController.getOrders);
customerRouter.put('/orders/:id', authMiddleware, CustomerController.updateOrderStatus);
customerRouter.get('/order/:id', authMiddleware, CustomerController.getOrderById);

module.exports = customerRouter;