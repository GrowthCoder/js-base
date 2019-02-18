'use strict';
module.exports = (sequelize, DataTypes) => {
  const shops = sequelize.define('shops', {
    name: DataTypes.STRING,
    thumb_url: DataTypes.STRING
  }, {});
  shops.associate = function(models) {
    // associations can be defined here
  };
  return shops;
};