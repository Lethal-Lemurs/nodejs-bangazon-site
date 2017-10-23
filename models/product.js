'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date_added: DataTypes.DATE,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {timestamps: false});
  
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };

  Product.associate = (models) =>{
    Product.belongsTo(models.Product_type, {
      onDelete: 'CASCADE'
    });
  };

  Product.associate = function(models) {
    Product.belongsToMany(models.Order, {
      foreignKey: 'id',
      as: 'Order_Product',
      through: 'OrderProduct',
      onDelete: 'CASCADE'
    });
  };

  return Product;
};