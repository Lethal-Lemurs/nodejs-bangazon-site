'use strict';

let { pay_types } = require('./data/pay-type-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pay_types', pay_types, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pay_types', null, {});
  }
};