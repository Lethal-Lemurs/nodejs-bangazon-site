'use strict';

const { Router } = require('express');
const router = Router();

const { getProducts, displayNewProductForm, postProduct, getProdById } = require('../controllers/productCtrl');

router.get('/products', getProducts);
router.get('/product-details/:id', getProdById);
router.get('/postProduct', displayNewProductForm);
router.post('/postProduct', postProduct);

module.exports = router;
