"use strict";
module.exports = (sequelize, DataTypes) => {
  const Round = sequelize.define(
    "Round",
    {
      TournamentId: DataTypes.NUMBER,
      type: DataTypes.STRING,
    },
    {}
  );
  Round.associate = function (models) {
    Round.belongsTo(models.Tournament);
    Round.hasMany(models.Match);
  };
  return Round;
};
