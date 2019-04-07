'use strict';

const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) =>  queryInterface.bulkInsert(
    'plans', 
    [{
      id: 1, 
      type: 'cn', school: '北京大学', date: '2018/4/1', address: '北京大学', activity: '双选会',
      ...timestamps,
    },{
      id: 2, 
      type: 'cn', school: '北京大学', date: '2018/4/1', address: '北京大学', activity: '双选会',
      ...timestamps,
    },
    {
      id: 3, 
      type: 'cn', school: '北京大学', date: '2018/4/1', address: '北京大学', activity: '双选会',
      ...timestamps,
    },
    {
      id: 4, 
      type: 'cn', school: '北京大学', date: '2018/4/1', address: '北京大学', activity: '双选会',
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
  return queryInterface.bulkDelete('plans', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  }
};
