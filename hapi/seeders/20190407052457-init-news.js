'use strict';

const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'news', 
    [{
      id: 1, 
      newsTitle: 'cn', mainInfo: '北京大学', detailInfo: 'detailInfo', newsPictureId: 1, lang: 'cn',
      ...timestamps,
    },{
      id: 2, 
      newsTitle: 'cn', mainInfo: '北京大学', detailInfo: 'detailInfo', newsPictureId: 1, lang: 'cn',
      ...timestamps,
    },
    {
      id: 3, 
      newsTitle: 'cn', mainInfo: '北京大学', detailInfo: 'detailInfo', newsPictureId: 1, lang: 'cn',
      ...timestamps,
    },
    {
      id: 4, 
      newsTitle: 'cn', mainInfo: '北京大学', detailInfo: 'detailInfo', newsPictureId: 1, lang: 'cn',
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
  return queryInterface.bulkDelete('shops', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  }
};
