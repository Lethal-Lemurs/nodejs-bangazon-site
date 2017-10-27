'use strict';

module.exports.getProducts = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findAll()
  .then( (products) => {
    console.log(req.query)
    let input = req.query.search;
    input = input.toLowerCase();
    let searchProds = [];
    for(let i = 0; i < products.length; i++){
      if(products[i].name.toLowerCase() === input) {
        searchProds.push(products[i])
      }
    }
    res.render('search-product', { 
      searchProds
     });
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
   .catch( (err) => {
    next(err);
  });
}

module.exports.displayNewProductForm = (req, res, next) => {
  const { Product_type } = req.app.get('models');
  Product_type.findAll()
  .then( (product_types) => {
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
  let newPrice = Number(req.body.price);
  Product.create({
    date_added: new Date(),
    name: req.body.name,
    description: req.body.description,
    price: newPrice,
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