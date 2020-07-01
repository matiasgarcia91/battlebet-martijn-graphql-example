"use strict";
module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define(
    "League",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  League.associate = function (models) {
    League.hasMany(models.Team);
    League.hasMany(models.Fixture);
    League.hasMany(models.Tournament);
  };
  return League;
};
