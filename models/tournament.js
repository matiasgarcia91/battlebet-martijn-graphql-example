"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      UserId: { type: DataTypes.NUMBER, allowNull: false },
    },
    {}
  );
  Tournament.associate = function (models) {
    Tournament.belongsTo(models.User);
    Tournament.hasOne(models.PlayerGroup);
  };
  return Tournament;
};
