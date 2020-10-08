"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
const faker = require("faker");
const users = [...Array(10)].map((user) => ({
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync("1234", SALT_ROUNDS),
  avatar: faker.image.avatar(),
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
