'use strict';

module.exports.removeProduct = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  console.log('req PRAMAS', req.params.id)
  Order.destroy({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then( () => {
    console.log('I GOT I GOT I GOT ROYALTY GOT LOYALTY INSIDE MY DNA')
    res.render('welcome')
  })
  .catch( (err) => {
    console.log('Error with remove product')
  });
};

module.exports.removeOrder = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.destroy({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then( () => {
    res.render('welcome')
  })
  .catch( (err) => {
    console.log('Error with remove product')
  });
};

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
    if (order == null) {
      // create order
      // console.log("order was null!!!!!!!!!!!!!!!!!")
      Order.create({
        user_id: req.session.passport.user.id,
        payType_id: null,
        open_closed: true
      })
      .then((newOrder) => {
        return newOrder.addProduct(req.params.id)
      })
    }
    else {
      return order.addProduct(req.params.id)
    }
    // console.log("order", order);
  })
  .then(() => {
    res.redirect('/orders')
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getOrders = (req, res, next) => {
  let ordersData;
  console.log("orders please!", ordersData)
  const { Order, Product } = req.app.get('models');
  Order.findOne({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then( (ordersData) => {
    return ordersData = ordersData.getProducts()
  })
  .then ( (productData) => {
    console.log("What we expect?????????????", productData, ordersData)
    res.render('orders', { ordersData, productData });
  })
  .catch( (err) => {
    next(err);
  });
};