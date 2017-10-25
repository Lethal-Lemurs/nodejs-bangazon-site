'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
    payType_id: DataTypes.INTEGER,
    open_closed: DataTypes.BOOLEAN
  }, 
  {underscored: true, timestamps: false});
   
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });

    Order.hasOne(models.Pay_type);
    
    Order.belongsToMany(models.Product, {
      through: 'Order_Products',
      timestamps: false,
      onDelete: 'CASCADE'
    });
  };

  return Order;
};