const express = require('express');
const SellerController = require('../controllers/SellerController');

const router = express.Router();

router.get('/', SellerController.getAllSellers);
router.get('/orders/:userId', SellerController.getAllOrders);
router.get('/order/:id', SellerController.getOrderById);

module.exports = router;
