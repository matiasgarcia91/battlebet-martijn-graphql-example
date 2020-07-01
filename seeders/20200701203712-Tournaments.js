"use strict";

const faker = require("faker");
const Tournaments = [...Array(5)].map((tour) => ({
  name: faker.commerce.productName(),
  LeagueId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

for (let index = 0; index < Tournaments.length; index++) {
  Tournaments[index].UserId = index + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tournaments", Tournaments, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tournaments", null, {});
  },
};
