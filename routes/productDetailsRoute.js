'use strict';

const { Router } = require('express');
const router = Router();

const { getOneProduct, postToOrder } = require('../controllers/productDetailsCtrl');

// When the request is a GET on the product-details route, call get product details.
router.get('/product-details/:id', getOneProduct);
router.post('/postToOrder/:id', postToOrder)

module.exports = router;