"use strict";
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING,
      LeagueId: { type: DataTypes.INTEGER, allowNull: false },
      logo: DataTypes.STRING,
    },
    {}
  );
  Team.associate = function (models) {
    Team.belongsTo(models.League);
    Team.hasMany(models.Fixture, {
      as: "homeTeam",
      foreignKey: { name: "team1" },
    });
    Team.hasMany(models.Fixture, {
      as: "awayTeam",
      foreignKey: { name: "team2" },
    });
    Team.hasMany(models.Fixture, {
      as: "winnerTeam",
      foreignKey: { name: "winner" },
    });
  };
  return Team;
};
