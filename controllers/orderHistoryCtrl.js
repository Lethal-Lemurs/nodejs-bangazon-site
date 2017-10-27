'use strict';

module.exports.getOrderHistory = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.findAll({raw: true,
    where: {
      open_closed: false
    }
  })
  .then( (data) => {
    console.log("the data", data);
    res.render('order-history', { data });
  })
  .catch( (err) => {
    next(err);
  });
};