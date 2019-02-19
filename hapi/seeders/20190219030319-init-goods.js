'use strict';
const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: (queryInterface, Sequelize) =>  queryInterface.bulkInsert(
    'goods', 
    [{
      id: 1, 
      name: '商品1-1', shop_id: 1, thumb_url: '1.png', 
      ...timestamps,
    },{
      id: 2, name: '商品1-2', shop_id: 1, thumb_url: '2.png', 
      ...timestamps,
    },
    {
      id: 3, name: '商品1-3', shop_id: 1, thumb_url: '3.png', 
      ...timestamps,
    },
    {
      id: 4, name: '商品2-1', shop_id: 2, thumb_url: '4.png', 
      ...timestamps,
    }], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  ,

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('goods', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  }
};
