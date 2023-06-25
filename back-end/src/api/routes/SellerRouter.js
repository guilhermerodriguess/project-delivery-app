const express = require('express');
const SellerController = require('../controllers/SellerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, SellerController.getAllSellers);
router.get('/orders/:userId', authMiddleware, SellerController.getAllOrders);
router.get('/order/:id', authMiddleware, SellerController.getOrderById);

module.exports = router;
