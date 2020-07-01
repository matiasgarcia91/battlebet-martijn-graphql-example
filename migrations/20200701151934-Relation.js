"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Matches", "predictionPlayer1", {
      type: Sequelize.INTEGER,
      references: {
        model: "Predictions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
      await queryInterface.addColumn("Matches", "predictionPlayer2", {
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
    await queryInterface.removeColumn("Matches", "predictionPlayer1");
    await queryInterface.removeColumn("Matches", "predictionPlayer2");
  },
};
