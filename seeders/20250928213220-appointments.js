'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const appointments = [];


    for (let i = 0; i < 20; i++) {
      appointments.push({
        user_id: faker.number.int({ min: 21, max: 40 }),
        doctor_id: faker.number.int({ min: 1, max: 20 }),
        appointment_date: faker.date.soon({ days: 30 }),
        status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
        created_at: new Date(),
        updated_at: new Date()
      });
         }

    await queryInterface.bulkInsert('appointments', appointments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointments', null, {});
  }
};
