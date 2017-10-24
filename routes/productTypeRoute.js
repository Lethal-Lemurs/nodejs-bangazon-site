'use strict';

const { Router } = require('express');
const router = Router();

const { getProductTypes } = require('../controllers/productTypeCtrl');

router.get('/productTypes', getProductTypes);

module.exports = router;