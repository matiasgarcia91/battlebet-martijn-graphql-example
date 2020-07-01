"use strict";

const faker = require("faker");
const teams = [...Array(8)].map((team) => ({
  name: faker.company.companyName(),
  LeagueId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Teams", teams, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teams", null, {});
  },
};
