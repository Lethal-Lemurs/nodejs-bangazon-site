'use strict';

const { Router } = require('express');
const router = Router();

const { getProducts, postProduct } = require('../controllers/dproductCtrl');

router.get('/products', getProducts);
router.post('/postProduct', postProduct);

module.exports = router;