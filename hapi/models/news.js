'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    newsTitle: DataTypes.STRING,
    mainInfo: DataTypes.STRING,
    detailInfo: DataTypes.STRING,
    newsPictureId: DataTypes.INTEGER,
    lang: DataTypes.STRING
  }, {});
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};