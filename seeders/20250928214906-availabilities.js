'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const availabilities = [];

   for (let doctorId = 1; doctorId <= 20; doctorId++) {

      for (let i = 0; i < 5; i++) {
        const date = faker.date.soon({ days: 30 }); 
        const startHour = faker.number.int({ min: 8, max: 15 }); 
        const startMinute = faker.helpers.arrayElement([0, 15, 30, 45]);
        const endHour = startHour + 1; 
        const endMinute = startMinute;

        availabilities.push({
          doctor_id: doctorId,
          available_date: date.toISOString().split('T')[0], 
          start_time: `${String(startHour).padStart(2,'0')}:${String(startMinute).padStart(2,'0')}:00`,
          end_time: `${String(endHour).padStart(2,'0')}:${String(endMinute).padStart(2,'0')}:00`,
          created_at: new Date(),
          updated_at: new Date()
      });
    }
  }
    await queryInterface.bulkInsert('availabilities',availabilities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('availabilities',null, {});
  }
};
