"use strict";

const faker = require("faker");
const Fixtures = [...Array(4)].map((fix) => ({
  date: faker.date.future(),
  status: "Upcoming",
  LeagueId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

for (let index = 0; index < Fixtures.length; index++) {
  let a = 1 + index;
  let b = 8 - index;
  Fixtures[index].team1 = a;
  Fixtures[index].team2 = b;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Fixtures", Fixtures, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Fixtures", null, {});
  },
};
