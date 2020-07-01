"use strict";

const UsersPlayerGroups = [...Array(5)].map((tour) => ({
  createdAt: new Date(),
  updatedAt: new Date(),
}));

for (let index = 0; index < 5; index++) {
  UsersPlayerGroups[index].PlayerGroupId = index + 1;
  UsersPlayerGroups[index].UserId = index + 1;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UsersPlayerGroups",
      UsersPlayerGroups,
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UsersPlayerGroups", null, {});
  },
};
