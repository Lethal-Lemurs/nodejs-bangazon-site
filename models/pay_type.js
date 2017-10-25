'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pay_type = sequelize.define('Pay_type', {
    name: DataTypes.STRING,
    // user_id: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    active_inactive: DataTypes.BOOLEAN
  }, {underscored:true}, {timestamps: false});
  
  Pay_type.associate = (models) => {
    Pay_type.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  
  return Pay_type;
};