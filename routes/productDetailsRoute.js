'use strict';

const { Router } = require('express');
const router = Router();

const { getOneProduct, postToOrder, getOrders, putToComplete, getToComplete, getPayTypes, removeProduct, removeOrder } = require('../controllers/productDetailsCtrl');

// When the request is a GET on the product-details route, call get product details.
router.get('/product-details/:id', getOneProduct);
router.post('/postToOrder/:id', postToOrder)
router.get('/orders', getOrders)
router.post('/removeProduct', removeProduct)
router.post('/removeOrder', removeOrder)
router.get('/putToComplete/:id', getPayTypes, getToComplete);
router.put('/putToComplete/:id', putToComplete);

module.exports = router;