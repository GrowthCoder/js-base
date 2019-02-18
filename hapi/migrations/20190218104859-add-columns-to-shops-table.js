'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   queryInterface.addColumn('shops', 'address', { type: Sequelize.STRING }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('shops', 'address'),
  ])
    
};
