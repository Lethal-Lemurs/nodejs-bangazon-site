'use strict';

const { Router } = require('express');
const router = Router();

const { getProductTypes, getProductByTypes, productTypeInNav } = require('../controllers/productTypeCtrl');

router.get('/productTypes', getProductTypes);
router.get('/getProductsByTypes/:prodTypeName', getProductByTypes);
router.get('/', productTypeInNav);

module.exports = router;