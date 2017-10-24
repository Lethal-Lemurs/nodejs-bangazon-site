'use strict';

module.exports.getProducts = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findAll()
  .then( (products) => {
    res.render('products', { products });
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.displayNewProductForm = (req, res, next) => {
    res.render('create-product');
};

module.exports.postProduct = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.create({
    date_added: new Date(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity
    // type_id: req.body.selectval
  })
  .then( () => {
    res.redirect('welcome');
  })
  .catch( (err) => {
    console.log(err);    
  });
};