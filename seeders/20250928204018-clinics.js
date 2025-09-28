'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const clinics = [];

    for (let i = 0; i < 20; i++) { 
      clinics.push({
        clinic_name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

     await queryInterface.bulkInsert('clinics', clinics, {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('clinics', clinics, {});
  }
};
