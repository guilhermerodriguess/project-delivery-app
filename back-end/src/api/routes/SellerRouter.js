const express = require('express');
const SellerController = require('../controllers/SellerController');

const router = express.Router();

router.get('/', SellerController.getAllSellers);
router.get('/orders/:userId', SellerController.getAllOrders);

module.exports = router;
