'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('hasils', 'nilai_tertinggi', {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('hasils', 'nilai_tertinggi', {
      type: Sequelize.INTEGER,
    });
  }
};
