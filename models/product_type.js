'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: DataTypes.STRING
  });

  Product_type.associate = (models) => {
    Product_type.hasOne(models.Product, {
      foreignKey: 'type_id',
    });
  };
  return Product_type;
};