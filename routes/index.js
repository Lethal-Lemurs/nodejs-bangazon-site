'use strict';

const { Router } = require('express');
const router = Router();

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
// router.get('/welcome', welcome);
router.use(require('./productDetailsRoute'));
//Joe and Me took this from authRoute so that we can use isLoggedIn as a gatekeeper for private routes. 

module.exports = router;