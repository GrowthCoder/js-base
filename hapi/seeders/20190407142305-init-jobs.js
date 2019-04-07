'use strict';

const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'jobs', 
    [{
      id: 1, 
      name: '行政助理', type: 'school', lang: 'cn', area: '北京、西安', detail: '<p>112121212313我我为问问哦喂喂喂喂喂</p>',
      ...timestamps,
    },{
      id: 2, 
      name: '行政助理', type: 'society', lang: 'cn', area: '北京、西安', detail: '<p>112121212313我我为问问哦喂喂喂喂喂</p>',
      ...timestamps,
    }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('shops', { id: { [Op.in]: [1, 2] } }, {});
  }
};
