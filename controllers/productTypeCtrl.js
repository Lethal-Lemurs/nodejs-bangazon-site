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
  .catch( (err) => {
    next(err);
  });
};

// function by glen
module.exports.getProductByTypes = (req, res, next) => {
  let prodTypeName = req.params.prodTypeName;
  const { Product_type, Product } = req.app.get('models');
  Product_type.findAll({raw: true,
    where: {
      name: prodTypeName
    },
    include: [{ 
      model: Product
    }]
  })
  .then( (productDeetz) => {
    res.render('products-by-type', {productDeetz})
  })
  .catch( (err) => {
    next(err);
  });
};

module.exports.productTypeInNav = (req, res, next) => {
  console.log("the function was called");
  const { Product_type } = req.app.get('models');
  Product_type.findAll({raw: true})
  .then(  (prodTypes) => {
    // console.log("you got em!", prodTypes);
    req.navDropDown =  prodTypes;
    next();
  })
  .catch( (err) => {
    next(err);
  });
};