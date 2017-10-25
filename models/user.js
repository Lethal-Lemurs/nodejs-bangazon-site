'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {underscored:true}, {timestamps: false});

  User.associate= (models) => {
    User.hasMany(models.Product);

    User.hasMany(models.Pay_type);

    User.hasMany(models.Order);    
  };

  return User;
};
