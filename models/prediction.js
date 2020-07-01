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
    Prediction.belongsTo(models.Match, {
      as: "predictionPlayer1Prediction",
      foreignKey: { name: "predictionPlayer1" },
    });
    Prediction.belongsTo(models.Match, {
      as: "predictionPlayer2Prediction",
      foreignKey: { name: "predictionPlayer2" },
    });
    Prediction.belongsTo(models.User);
  };
  return Prediction;
};
