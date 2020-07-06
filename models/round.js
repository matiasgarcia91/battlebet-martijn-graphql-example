"use strict";
module.exports = (sequelize, DataTypes) => {
  const Round = sequelize.define(
    "Round",
    {
      TournamentId: DataTypes.NUMBER,
      type: DataTypes.ENUM("Quarter-Final", "Semi-Final", "Final"),
    },
    {}
  );
  Round.associate = function (models) {
    Round.belongsTo(models.Tournament);
    Round.hasMany(models.Match);
  };
  return Round;
};
