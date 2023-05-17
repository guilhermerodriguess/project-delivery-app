const express = require('express');
const SellerController = require('../controllers/SellerController');

const router = express.Router();

router.get('/', SellerController.getAllSellers);

module.exports = router;
