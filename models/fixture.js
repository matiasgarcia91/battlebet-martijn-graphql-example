"use strict";
module.exports = (sequelize, DataTypes) => {
  const Fixture = sequelize.define(
    "Fixture",
    {
      team1: DataTypes.INTEGER,
      team2: DataTypes.INTEGER,
      date: DataTypes.DATE,
      HTScoreTeam1: DataTypes.INTEGER,
      HTScoreTeam2: DataTypes.INTEGER,
      FTScoreTeam1: DataTypes.INTEGER,
      FTScoreTeam2: DataTypes.INTEGER,
      winner: DataTypes.INTEGER,
      status: DataTypes.ENUM("Upcoming", "Live", "Finished"),
    },
    {}
  );
  Fixture.associate = function (models) {
    Fixture.belongsTo(models.League);
    Fixture.belongsTo(models.Team, {
      as: "homeTeam",
      foreignKey: { name: "team1" },
    });
    Fixture.belongsTo(models.Team, {
      as: "awayTeam",
      foreignKey: { name: "team2" },
    }),
      Fixture.belongsTo(models.Team, {
        as: "winnerTeam",
        foreignKey: { name: "winner" },
      });
    Fixture.hasMany(models.Match);
    {
    }
  };
  return Fixture;
};
