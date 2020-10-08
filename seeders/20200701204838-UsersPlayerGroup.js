"use strict";

const UsersPlayerGroups = [...Array(10)].map((tour) => ({
  createdAt: new Date(),
  updatedAt: new Date(),
}));

for (let index = 0; index < 10; index++) {
  UsersPlayerGroups[index].PlayerGroupId = index + 1;
  UsersPlayerGroups[index].UserId = index + 1;
}

const UsersPlayerGroups2 = [...Array(6)].map((tour) => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  PlayerGroupId: 10,
}));

for (let index = 0; index < 6; index++) {
  UsersPlayerGroups2[index].UserId = index + 1;
}

let UPG = [...UsersPlayerGroups, ...UsersPlayerGroups2];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("UsersPlayerGroups", UPG, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UsersPlayerGroups", null, {});
  },
};
