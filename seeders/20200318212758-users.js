"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
const faker = require("faker");
const users = [...Array(10)].map((user) => ({
  userName: faker.name.firstName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync(faker.internet.password(8), SALT_ROUNDS),
  avatar: "https://i.imgur.com/m0pGSHF.png",
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
