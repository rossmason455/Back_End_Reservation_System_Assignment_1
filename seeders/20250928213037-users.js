'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];


    for (let i = 0; i < 15; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        phone: faker.phone.number(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
