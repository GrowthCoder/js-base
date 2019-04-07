'use strict';
module.exports = (sequelize, DataTypes) => {
  const jobs = sequelize.define('jobs', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    detail: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {});
  jobs.associate = function(models) {
    // associations can be defined here
  };
  return jobs;
};