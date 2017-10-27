'use strict';

const { Router } = require('express');
const router = Router();

const { getOrderHistory } = require('../controllers/orderHistoryCtrl');

router.get('/orderHistory', getOrderHistory);

module.exports = router;