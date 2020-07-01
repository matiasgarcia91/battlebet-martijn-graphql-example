"use strict";

const PlayerGroups = [...Array(5)].map((tour) => ({
  createdAt: new Date(),
  updatedAt: new Date(),
}));

for (let index = 0; index < PlayerGroups.length; index++) {
  PlayerGroups[index].TournamentId = index + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PlayerGroups", PlayerGroups, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PlayerGroups", null, {});
  },
};
