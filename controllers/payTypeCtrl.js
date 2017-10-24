'use strict';
//PRIVATE ROUTE
//Sam Staff. This displays the initial form.
module.exports.displayPayForm = (req, res, next) => {
  res.render('add-pay.pug');
}

//Sam Staff. This function will enable the payment type in the payment type form partial. It will 
//render or redirect from the profile view
module.exports.postPayType = (req, res, next) => {
  console.log(`postPayType getting called in ctrl`);
  const { Pay_type } = req.app.get('models');
  Pay_type.create({
    name: req.body.name,
    account: req.body.account
  })
  .then( () => {
    res.render('add-pay.pug', {message: `${req.body.name} payment method added to your account!`})//redirect to the profile or back to addPayment pug?
  })
  .catch( (err) => {
    console.log(`Error in postPayType`, err);
  });
};

