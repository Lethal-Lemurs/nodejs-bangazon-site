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