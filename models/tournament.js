"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      LeagueId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Tournament.associate = function (models) {
    Tournament.belongsTo(models.User);
    Tournament.hasOne(models.PlayerGroup);
    Tournament.hasMany(models.Round);
    Tournament.belongsTo(models.League);
  };
  return Tournament;
};
