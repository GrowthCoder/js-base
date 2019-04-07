'use strict';
module.exports = (sequelize, DataTypes) => {
  const plans = sequelize.define('plans', {
    type: DataTypes.STRING,
    school: DataTypes.STRING,
    date: DataTypes.DATE,
    address: DataTypes.STRING,
    activity: DataTypes.STRING,
    time: DataTypes.STRING,
  }, {});
  plans.associate = function(models) {
    // associations can be defined here
  };
  return plans;
};