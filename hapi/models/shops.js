'use strict';
module.exports = (sequelize, DataTypes) => {
  const shops = sequelize.define('shops', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumb_url: DataTypes.STRING
  }, {
    tableName: 'shops',
  });
  shops.associate = function(models) {
    // associations can be defined here
  };
  return shops;
};