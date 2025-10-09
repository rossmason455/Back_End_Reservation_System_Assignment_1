'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];


    const roles = ['patient', 'doctor'];



    for (let i = 0; i < 30; i++) {

       const role = roles[Math.floor(Math.random() * roles.length)];


      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        phone: faker.phone.number(),
        role: role,
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
