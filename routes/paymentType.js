'use strict';

const { Router } = require('express');
const router = Router();

const { postPayType, displayPayForm, deletePayType, getDeletePayTypes } = require('../controllers/payTypeCtrl');

//tied to payment pugs and partials
router.get('/addPayType', displayPayForm);
router.post('/addPayType', postPayType);
router.get('/deletePayType', getDeletePayTypes);
router.delete('/deletePayType', deletePayType);

module.exports = router;