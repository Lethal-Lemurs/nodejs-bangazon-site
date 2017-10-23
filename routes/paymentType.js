'use strict';

const { Router } = require('express');
const router = Router();

const { postPayType } = require('../controllers/payTypeCtrl');

router.get('/addPayType', postPayType);

module.exports = router;