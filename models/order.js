'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
    payType_id: DataTypes.INTEGER,
    open_closed: DataTypes.BOOLEAN
  });
   
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
  };

  Order.associate = (models) => {
    Order.hasOne(models.Pay_type);
  };

  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {
      foreignKey: 'id',
      as: 'Order_Product',
      through: 'OrderProduct',
      onDelete: 'CASCADE'
    });
  };

  return Order;
};