"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Matches", "predPlayer1", {
      type: Sequelize.INTEGER,
      references: {
        model: "Predictions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
      await queryInterface.addColumn("Matches", "predPlayer2", {
        type: Sequelize.INTEGER,
        references: {
          model: "Predictions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Matches", "predPlayer1");
    await queryInterface.removeColumn("Matches", "predPlayer2");
  },
};
