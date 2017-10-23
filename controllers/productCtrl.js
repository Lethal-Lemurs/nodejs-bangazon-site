'use strict'

module.exports.displayNewProductForm = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findAll()
  .then( (products) => {
    res.render('create-product', {
      products
    });
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.postProduct = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.create({
    name: req.body.name,
    type_id: req.body.type_id,
    price: req.body.price,
    quantity: req.body.quantity,
    date_added: req.body.date_added,
    description: req.body.description,
    user_id: req.body.user_id
  })
  .then( () => {
    res.redirect('products');
  })
  .catch( (err) => {
    console.log(err);    
  });
};