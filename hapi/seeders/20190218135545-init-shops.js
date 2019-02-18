'use strict';

const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('shops', 
  [
    { id: 1, name: '店铺1', thumb_url: '1.png', ...timestamps, address: '杭州市' },
    { id: 2, name: '店铺2', thumb_url: '2.png', ...timestamps, address: '杭州市' },
    { id: 3, name: '店铺3', thumb_url: '3.png', ...timestamps, address: '杭州市' },
    { id: 4, name: '店铺4', thumb_url: '4.png', ...timestamps, address: '杭州市' },
  ],
  {}
  ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    // 删除 shop 表 id 为 1，2，3，4 的记录
    return queryInterface.bulkDelete('shops', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  }
};
