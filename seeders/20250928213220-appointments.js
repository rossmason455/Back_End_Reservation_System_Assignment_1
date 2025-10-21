"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const appointments = [];

    for (let patientId = 21; patientId <= 40; patientId++) {
      for (let i = 0; i < 3; i++) {
        const doctorId = faker.number.int({ min: 1, max: 20 });

        const slot = await Availability.findOne({
          where: { doctor_id: doctorId },
          order: Sequelize.literal("RAND()"),
        });

        if (!slot) continue;

        appointments.push({
          user_id: patientId,
          doctor_id: doctorId,
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
