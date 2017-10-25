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
  // console.log("Getting to Post function!")
  const { Order, Product } = req.app.get('models');
  // console.log("ORDERS", Order);
  Order.findOne({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then((order) => {
    console.log("order", order);
    return order.addProduct(req.params.id)
  })
  .then( (orderData) => {
      res.json(orderData);
  })
  .catch( (err) => {
    next(err);
  });
};