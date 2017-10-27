'use strict';

const { Router } = require('express');
const router = Router();

const { getProfile, getProfileForEdit, saveProfileEdit } = require('../controllers/profileCtrl');


router.get('/userProfile', getProfile);
router.get('/editProfile', getProfile);
router.put('/editProfile', saveProfileEdit);


module.exports = router;
