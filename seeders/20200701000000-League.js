"use strict";

const league = [...Array(1)].map((league) => ({
  name: "Demo League",
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Leagues", league, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Leagues", null, {});
  },
};
