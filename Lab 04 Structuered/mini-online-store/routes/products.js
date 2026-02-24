/**
 * PRODUCT ROUTES
 * Restaurant Analogy: The Section of the Menu dedicated to Meals.
 * We use express.Router() to keep our routes organized and separate.
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Definition: GET /products
// Business Logic: productController.getAllProducts
router.get('/', productController.getAllProducts);

module.exports = router;
