'use strict';
//need user id

//PRIVATE ROUTE
//Sam Staff. This displays the initial form.
module.exports.displayPayForm = (req, res, next) => {
  res.render('add-pay.pug');
}

//Sam Staff. This function will enable the payment type in the payment type form partial. It will 
//render or redirect from the profile view. Use req.session.passport.user to grab the current user.
module.exports.postPayType = (req, res, next) => {
  const { Pay_type } = req.app.get('models');
  Pay_type.create({
    name: req.body.name,
    user_id: req.session.passport.user.id,
    account: req.body.account,
    active_inactive: true
  })
  .then( () => {
    res.redirect('/userProfile');
  })
  .catch( (err) => {
    console.log(`Error in postPayType`, err);
  });
};

//renders the initial Delete paytypes page with the needed data
module.exports.getDeletePayTypes = (req, res, next) => {
  const { Pay_type } = req.app.get('models');
  console.log(`id`, req.session.passport.user.id);
  Pay_type.findAll({
    where: {
      user_id: req.session.passport.user.id
    }
  })
  .then( (payTypes) => {
    res.render('delete-pay.pug', {payTypes});  
  })
  .catch( (err) => {
    console.log(`Error in getDeletePayTypes`, err);
  });
};

//Deletes the paytype related to the user with the appropriate req.params
module.exports.deletePayType = (req, res, next) => {
  const { Pay_type } = req.app.get('models');
  Pay_type.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( () => {
    res.redirect('/userProfile')
  })
  .catch( (err) => {
    console.log(`Error in deletePayType`, err);
  });
};