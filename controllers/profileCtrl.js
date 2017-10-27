'use strict';

module.exports.getProfile = (req, res, next) => {
  const { User, Pay_type } = req.app.get('models');
  User.findAll({ raw: true,
    where: {
      id: req.session.passport.user.id
    },
    include: [{
      model: Pay_type
    }]
  })
  .then( (userInfo) => {
    console.log("??", userInfo);
    if (req.url === '/editProfile') {
      res.render('profile-edit', { userInfo });
    } else {
      res.render('profile', { userInfo });
    }
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.saveProfileEdit = (req, res, next) => {
  console.log("2");
  const { User } = req.app.get('models');
  User.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address
  }, {where: {id: req.session.passport.user.id}})
  .then( () => {
    res.redirect('/userProfile');
  }) 
  .catch( (err) => {
    next(err);
  });
};