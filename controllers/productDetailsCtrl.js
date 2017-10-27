'use strict';
// Also deals with orders for now...

let currentOrder;

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
  const { Order, Product } = req.app.get('models');
  Order.findOne({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then((order) => {
    if (order == null) {
      // create order
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
  })
  .then(() => {
    res.redirect('/orders')
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.getOrders = (req, res, next) => {
  let ordersList;
  const { Order, Product } = req.app.get('models');
  Order.findOne({where: {user_id: req.session.passport.user.id, open_closed: true}})
  .then( (ordersData) => {
    // console.log("please work???????", ordersData)
    ordersList = ordersData;
    return ordersData.getProducts()
  })
  .then ( (productData) => {
    const {dataValues:currentOrder} = ordersList;
    // console.log("have mercy!!!!", orders)
    res.render('orders', { currentOrder, productData });
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.putToComplete = (req, res, next) => {
  console.log("made it to putToComplete function!")
  const { Order } = req.app.get('models');
  console.log(req.body.selectval);
    Order.update({
    payType_id: req.body.selectval,
    open_closed: false
    }, {where: {id: req.params.id}})
    // Need to add pay type to order
    .then ( (data) => {
      res.json(data);
    })
    .catch( (err) => {
    next(err);
    });
  };


module.exports.getToComplete = (req, res, next) => {
  console.log("made it to getToComplete function!");
  const { Order, Pay_type } = req.app.get('models');
  Order.findOne({where: {id: req.params.id, open_closed: true}})
  .then( (ordersData) => {
    const {dataValues:orders} = ordersData;
    req.orders = orders;
    let orderId = req.orders.id;
    let payTypes = req.payTypes;
    res.render('complete-order-form', {orders, payTypes, orderId});
  })
};

// Gets PayTypes for completing an order
// db and ss
module.exports.getPayTypes = (req, res, next) => {
  const { Pay_type } = req.app.get('models');
  Pay_type.findAll({raw: true,
    where: {
      user_id: req.session.passport.user.id
    }
  })
  .then( (payTypes) => {
    req.payTypes = payTypes;
    next();  
  })
  .catch( (err) => {
    console.log(`Error in getPayTypes`, err);
  });
};