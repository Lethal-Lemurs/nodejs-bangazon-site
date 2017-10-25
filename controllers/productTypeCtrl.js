'use strict';

module.exports.getProductTypes = (req, res, next) => {
  const { Product_type, Product } = req.app.get('models');
  // console.log("prodtype", Product_type.id);
  Product_type.findAll({raw: true,
    order: ['id'],
    include: [{ 
      model: Product
    }]
  })
  .then( (prodTypeData) => {
    res.render('prodtype', {prodTypeData});

    // console.log("the data", prodTypeData[0]);
  })
  // let prodTypeData;
  // Product_type.findAll()
  // .then( (data) => {
  //   prodTypeData = data;
  //   // console.log("WUT", prodTypeData.id);
  //   return Product.findAndCountAll({ where: {type_id: prodTypeData[1].dataValues.id}})
  // })
  // .then( (prodData) => {
  //   // console.log('???', prodData);
  // })
  // .catch( (err) => {
  //   next(err);
  // });
};