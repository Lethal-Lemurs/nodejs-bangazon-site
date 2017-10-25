'use strict';

module.exports.getOneProduct = (req, res, next) => {
  const { Product } = req.app.get('models'); 
  Product.findOne({where: {id: req.params.id} })
  .then( (prodData) => {
      const {dataValues:product} = prodData;
      res.render('product-details', {product});
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postToOrder = (req, res, next) => {
  console.log("Getting to Post function!")
  const { Order, Product } = req.app.get('models');
  console.log("ORDERS", Order);
  Order.findOrCreate({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .spread((order, created) => {
    console.log(order.get({
      plain: true
    }))
    console.log(created)
  // .then( (orderData) => {
  //     // const {dataValues:product} = prodData;
  //     console.log("ORDERS", orderData);
  //     res.render('/orders', {orderData});
  })
  .catch( (err) => {
    next(err);
  });
};