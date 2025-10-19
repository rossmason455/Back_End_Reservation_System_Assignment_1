'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     const doctorUsers = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE role = 'doctor';`
    );
    const doctorUserIds = doctorUsers[0].map(u => u.id);

    const doctors = [];

    for (let i = 0; i < doctorUserIds.length; i++) { 
      doctors.push({
        user_id: doctorUserIds[i],
        name: `Dr. ${faker.person.fullName()}`,
        specialization: faker.helpers.arrayElement([
          'Cardiology',
          'Dermatology',
          'Neurology',
          'Orthopedics',
          'Pediatrics',
          'Oncology',
          'Psychiatry',
          'Gastroenterology',
          'Endocrinology',
          'Ophthalmology',
          'ENT',
          'Urology'
        ]),
        clinic_id: faker.number.int({ min: 1, max: 20 }), 
        created_at: new Date(),
        updated_at: new Date()
      });
    }

     await queryInterface.bulkInsert('doctors', doctors, {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('doctors', null, {});
  }
};
