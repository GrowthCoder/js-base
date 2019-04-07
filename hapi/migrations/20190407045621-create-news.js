'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newsTitle: {
        type: Sequelize.STRING
      },
      mainInfo: {
        type: Sequelize.STRING
      },
      detailInfo: {
        type: Sequelize.STRING
      },
      newsPictureId: {
        type: Sequelize.INTEGER
      },
      lang: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('news');
  }
};