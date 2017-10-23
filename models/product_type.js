'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: DataTypes.STRING
  });

  Product_type.associate = (models) => {
   Product_type.hasOne(models.Product);
  };
  return Product_type;
};