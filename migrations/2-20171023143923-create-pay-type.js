'use strict';
//2
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pay_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.INTEGER
      },
      active_inactive: {
        type: Sequelize.BOOLEAN
      }
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pay_types');
  }
};