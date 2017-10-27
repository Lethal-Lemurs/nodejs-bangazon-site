'use strict';

const { Router } = require('express');
const router = Router();

const { welcome } = require('../controllers/authCtrl');

router.get('/', (req, res, next) => {
  res.render('index');
});
//public routes

// pipe all other requests through the route modules
router.use(require('./authRoute'));


// router.use(require('./foo'));
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}
router.use(isLoggedIn);
//private routes
router.get('/welcome', welcome);
router.use(require('./productTypeRoute'));
router.use(require('./paymentType'));
router.use(require('./productRoute'));
router.use(require('./productDetailsRoute'));
router.use(require('./profileRoute'));

module.exports = router;