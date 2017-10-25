'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: DataTypes.STRING
  }, {timestamps: false});

  Product_type.associate = (models) => {
   Product_type.hasMany(models.Product, {
    foreignKey: 'type_id'    
   });
  };
  return Product_type;
};