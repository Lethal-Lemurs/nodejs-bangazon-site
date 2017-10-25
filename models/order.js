'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    // user_id: DataTypes.INTEGER,
    // payType_id: DataTypes.INTEGER,
    open_closed: DataTypes.BOOLEAN
  }, {underscored:true});
   
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });

    Order.hasOne(models.Pay_type, {
      foreignKey: 'id'
    });
    
    Order.belongsToMany(models.Product, {
      foreignKey: 'id',
      as: 'Order_Product',
      through: 'OrderProduct',
      onDelete: 'CASCADE'
    });
  };

  return Order;
};