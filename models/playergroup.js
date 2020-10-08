"use strict";
module.exports = (sequelize, DataTypes) => {
  const PlayerGroup = sequelize.define(
    "PlayerGroup",
    {
      TournamentId: { type: DataTypes.NUMBER, allowNull: false },
    },
    {}
  );
  PlayerGroup.associate = function (models) {
    PlayerGroup.belongsTo(models.Tournament);
    PlayerGroup.belongsToMany(models.User, {
      through: "UsersPlayerGroup",
      foreignKey: "PlayerGroupId",
    });
  };
  return PlayerGroup;
};
