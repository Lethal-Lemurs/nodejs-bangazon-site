'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pay_type = sequelize.define('Pay_type', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    active_inactive: DataTypes.BOOLEAN
  }, {timestamps: false});
  
  Pay_type.associate = (models) => {
    Pay_type.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });

    Pay_type.belongsTo(models.Order);
    
  };
  
  return Pay_type;
};