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

module.exports.getProdById = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findOne({
    where: {
      id: req.params.id
    }
   })
   .then( (product) => {
     res.render('product-details', { product });
   })
}

module.exports.displayNewProductForm = (req, res, next) => {
  const { Product_type } = req.app.get('models');
  Product_type.findAll()
  .then( (product_types) => {
    console.log('prod type stuff', product_types);
    res.render('create-product', {
      product_types
    });
  })
  .catch( (err) => {
    next(err);
  });  
};

module.exports.postProduct = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.create({
    date_added: new Date(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    type_id: req.body.selectval,
    user_id: req.session.passport.user.id
  })
  .then( () => {
    res.redirect('welcome');
  })
  .catch( (err) => {
    console.log(err);    
  });
};