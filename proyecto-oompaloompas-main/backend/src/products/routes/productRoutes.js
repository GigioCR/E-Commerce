const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productsController');
const ProductRepository = require('../repository/productsRepository');

const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);

router.get('/', productController.getAllProducts.bind(productController));
router.get('/search', productController.searchProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.post('/', productController.createProduct.bind(productController));

module.exports = router;