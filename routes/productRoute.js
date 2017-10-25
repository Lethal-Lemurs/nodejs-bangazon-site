'use strict';

const { Router } = require('express');
const router = Router();

const { getProducts, displayNewProductForm, postProduct } = require('../controllers/productCtrl');

router.get('/products', getProducts);
// router.get('/product-details/:id', getOneProduct);
router.get('/postProduct', displayNewProductForm);
router.post('/postProduct', postProduct);

module.exports = router;
