"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Tournament);
    User.hasMany(models.Prediction);
    User.belongsToMany(models.PlayerGroup, {
      through: "UsersPlayerGroup",
      foreignKey: "UserId",
    });
    User.hasMany(models.Match, {
      as: "player1User",
      foreignKey: { name: "player1" },
    });
    User.hasMany(models.Match, {
      as: "player2User",
      foreignKey: { name: "player2" },
    });
    User.hasMany(models.Match, {
      as: "winnerUser",
      foreignKey: { name: "winner" },
    });
  };
  return User;
};
