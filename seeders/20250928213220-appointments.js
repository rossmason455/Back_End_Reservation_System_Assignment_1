"use strict";
const { faker } = require("@faker-js/faker");
const { Availability } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const appointments = [];

    for (let patientId = 21; patientId <= 40; patientId++) {
      for (let i = 0; i < 3; i++) {
        const doctorId = faker.number.int({ min: 1, max: 20 });

         const slots = await Availability.findAll({
          where: { doctor_id: doctorId },
        });
     

         if (!slots || slots.length === 0) continue;

         const slot = slots[faker.number.int({ min: 0, max: slots.length - 1 })];

        appointments.push({
          user_id: patientId,
          doctor_id: doctorId,
          availability_id: slot.id,
          appointment_date: slot.start_datetime,
          status: faker.helpers.arrayElement([
            "pending",
            "confirmed",
            "cancelled",
          ]),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("appointments", appointments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
