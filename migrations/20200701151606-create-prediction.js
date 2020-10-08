"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Predictions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      HTScoreTeam1: {
        type: Sequelize.INTEGER,
      },
      HTScoreTeam2: {
        type: Sequelize.INTEGER,
      },
      FTScoreTeam1: {
        type: Sequelize.INTEGER,
      },
      FTScoreTeam2: {
        type: Sequelize.INTEGER,
      },
      winner: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Predictions");
  },
};
