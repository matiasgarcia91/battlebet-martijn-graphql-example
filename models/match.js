"use strict";
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      RoundId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FixtureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      winner: DataTypes.INTEGER,
      scorePlayer1: DataTypes.INTEGER,
      scorePlayer2: DataTypes.INTEGER,
      date: DataTypes.DATE,
      predictionPlayer1: DataTypes.INTEGER,
      predictionPlayer2: DataTypes.INTEGER,
    },
    {}
  );
  Match.associate = function (models) {
    Match.belongsTo(models.Round);
    Match.hasMany(models.Prediction, {
      as: "predictionPlayer1Prediction",
      foreignKey: { name: "predictionPlayer1" },
    });
    Match.hasMany(models.Prediction, {
      as: "predictionPlayer2Prediction",
      foreignKey: { name: "predictionPlayer2" },
    });
    Match.belongsTo(models.User, {
      as: "player1User",
      foreignKey: { name: "player1" },
    });
    Match.belongsTo(models.User, {
      as: "player2User",
      foreignKey: { name: "player2" },
    });
    Match.belongsTo(models.User, {
      as: "winnerUser",
      foreignKey: { name: "winner" },
    });
  };
  return Match;
};
