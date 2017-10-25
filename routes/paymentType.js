'use strict';

const { Router } = require('express');
const router = Router();

const { postPayType, displayPayForm } = require('../controllers/payTypeCtrl');

//tied to payment-type-form.pug partial
router.get('/addPayType', displayPayForm);
router.post('/addPayType', postPayType);

module.exports = router;