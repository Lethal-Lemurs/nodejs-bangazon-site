'use strict';

// function by glen
module.exports.getProductTypes = (req, res, next) => {
  const { Product_type, Product } = req.app.get('models');
  Product_type.findAll({raw: true,
    include: [{ 
      model: Product
    }]
  })
  .then( (prodData) => {
    // create the product type array with no reaccurances
    let isInArr = (val, arr) => {
      return arr.indexOf(val) > -1;
    };
    let prodTypeNameArr = [];
    for (let i = 0; i < prodData.length; i++) {
      if (isInArr(prodData[i].name, prodTypeNameArr)){}
      else {
        prodTypeNameArr.push(prodData[i].name);
      }
    };
    res.render('prodtype', {prodData, prodTypeNameArr});
  })
};