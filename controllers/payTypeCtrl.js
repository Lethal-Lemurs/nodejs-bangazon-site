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
    res.render('add-pay.pug', {message: `${req.body.name} payment method added to your account!`})//redirect to the profile or back to addPayment pug?
  })
  .catch( (err) => {
    console.log(`Error in postPayType`, err);
  });
};

module.exports.getDeletePayTypes = (req, res, next) => {
  console.log("getdeletepaytypes RUNNING!!!!!")
  const { Pay_type } = req.app.get('models');
  console.log(`id`, req.session.passport.user.id);
  Pay_type.findAll({//problem
    where: {
      user_id: req.session.passport.user.id
    }
  })
  .then( (payTypes) => {
    console.log(`data from get pay types`, payTypes);
    console.log(`success!!!!!!!!!!!!!!!!!!!!!!`);
    res.render('delete-pay.pug', {payTypes});  
  })
  .catch( (err) => {
    // console.log(`Error in getDeletePayTypes`, err);
    console.log(`error!!!!!!!!!!!!!!!!!!!!!!!!!`, err);
  });
};

module.exports.deletePayType = (req, res, next) => {
  console.log(`deletePayType called`);
  const { Pay_type } = req.app.get('models');
  Pay_type.destroy({
    where: {
      id: this.id
    }//would probably irl be done by other data, maybe name would work if it's user controlled?
  })
  .then( () => {
    res.render('delete-pay.pug', {message: `${this.name} payment method deleted!`})
  })
  .catch( (err) => {
    console.log(`Error in deletePayType`, err);
  });
};