"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = await import("@faker-js/faker");

    const bookings = await queryInterface.sequelize.query(
      "SELECT id FROM bookings;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const payments = [];

    for (const booking of bookings) {
      if (faker.datatype.boolean()) {
        payments.push({
          booking_id: booking.id,
          amount: faker.finance.amount(20, 500, 2),
          status: faker.helpers.arrayElement([
            "pending",
            "completed",
            "failed",
          ]),
          payment_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("payments", payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payments", null, {});
  },
};
