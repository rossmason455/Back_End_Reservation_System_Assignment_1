'use strict';

const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { faker } = await import('@faker-js/faker');
    const users = [];


    for (let i = 0; i < 40; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        phone: faker.phone.number(),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      });
    }


    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
