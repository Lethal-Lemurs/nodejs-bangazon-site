'use strict';

let { product_types } = require('./data/product-type-data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_types', product_types, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product_types', null, {});
  }
};