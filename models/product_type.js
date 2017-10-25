'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: DataTypes.STRING
  }, {underscored:true}, {timestamps: false});

  Product_type.associate = (models) => {
   Product_type.hasMany(models.Product);
  };
  return Product_type;
};