'use strict';
module.exports = (sequelize, DataTypes) => {
  const goods = sequelize.define('goods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumb_url: DataTypes.STRING,
    shop_id: DataTypes.INTEGER
  }, {
    tableName: 'goods',
  });
  goods.associate = function(models) {
    // associations can be defined here
  };
  return goods;
};