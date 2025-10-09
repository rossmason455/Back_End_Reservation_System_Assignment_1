'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];


    const numDoctors = 20;
    const numPatients = 20;



     for (let i = 0; i < numDoctors; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        phone: faker.phone.number(),
        role: 'doctor',
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    for (let i = 0; i < numPatients; i++) {
      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        phone: faker.phone.number(),
        role: 'patient',
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
