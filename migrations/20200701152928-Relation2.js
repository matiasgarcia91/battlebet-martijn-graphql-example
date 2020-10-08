"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Teams", "LeagueId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Leagues",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
      await queryInterface.addColumn("Fixtures", "LeagueId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Leagues",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      await queryInterface.addColumn("Fixtures", "team1", {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      await queryInterface.addColumn("Fixtures", "team2", {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      await queryInterface.addColumn("Tournaments", "LeagueId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Leagues",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      await queryInterface.addColumn("Fixtures", "winner", {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    await queryInterface.addColumn("Matches", "FixtureId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Fixtures",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Teams", "LeagueId");
    await queryInterface.removeColumn("Tournaments", "LeagueId");
    await queryInterface.removeColumn("Fixtures", "LeagueId");
    await queryInterface.removeColumn("Fixtures", "team1");
    await queryInterface.removeColumn("Fixtures", "team2");
    await queryInterface.removeColumn("Fixtures", "winner");
    await queryInterface.removeColumn("Matches", "FixtureId");
  },
};
