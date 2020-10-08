"use strict";
module.exports = (sequelize, DataTypes) => {
  const Prediction = sequelize.define(
    "Prediction",
    {
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      HTScoreTeam1: DataTypes.INTEGER,
      HTScoreTeam2: DataTypes.INTEGER,
      FTScoreTeam1: DataTypes.INTEGER,
      FTScoreTeam2: DataTypes.INTEGER,
      winner: DataTypes.INTEGER,
    },
    {}
  );
  Prediction.associate = function (models) {
    Prediction.hasMany(models.Match, {
      as: "predictionPlayer1",
      foreignKey: { name: "predPlayer1" },
    });
    Prediction.hasMany(models.Match, {
      as: "predictionPlayer2",
      foreignKey: { name: "predPlayer2" },
    });
    Prediction.belongsTo(models.User);
  };
  return Prediction;
};
