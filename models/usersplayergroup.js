"use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersPlayerGroup = sequelize.define(
    "UsersPlayerGroup",
    {
      UserId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      PlayerGroupId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {}
  );
  UsersPlayerGroup.associate = function (models) {
    UsersPlayerGroup.belongsTo(models.User);
    UsersPlayerGroup.belongsTo(models.PlayerGroup);
  };
  return UsersPlayerGroup;
};
