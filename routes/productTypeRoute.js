'use strict';

const { Router } = require('express');
const router = Router();

const { getProductTypes, getProductByTypes } = require('../controllers/productTypeCtrl');

router.get('/productTypes', getProductTypes);
router.get('/getProductsByTypes/:prodTypeName', getProductByTypes);

module.exports = router;