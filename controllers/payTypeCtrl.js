'use strict';
//PRIVATE ROUTE

//Sam Staff. This function will enable the payment type in the payment type form partial. It will 
//render or redirect from the 
module.exports.postPayType = (req, res, next) => {
  console.log(`postPayType getting called in ctrl`);
  const { pay_type } = req.app.get('models');
  pay_type.create({
    name: req.body.name,
    account: req.body.account
  })
  .then( () => {
    res.render('add-pay.pug')//redirect to the profile or back to addPayment pug?
  })
  .catch( (err) => {
    console.log(`Error in postPayType`, err);
  });
};

