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
      },
      player2: {
        type: DataTypes.INTEGER,
      },
      FixtureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      winner: DataTypes.INTEGER,
      scorePlayer1: DataTypes.INTEGER,
      scorePlayer2: DataTypes.INTEGER,
      date: DataTypes.DATE,
      predPlayer1: DataTypes.INTEGER,
      predPlayer2: DataTypes.INTEGER,
    },
    {}
  );
  Match.associate = function (models) {
    Match.belongsTo(models.Round);
    Match.belongsTo(models.Fixture);
    Match.belongsTo(models.Prediction, {
      as: "predictionPlayer1",
      foreignKey: { name: "predPlayer1" },
    });
    Match.belongsTo(models.Prediction, {
      as: "predictionPlayer2",
      foreignKey: { name: "predPlayer2" },
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
