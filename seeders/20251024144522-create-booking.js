"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = await import("@faker-js/faker");

    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users;",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const resources = await queryInterface.sequelize.query(
      "SELECT id FROM resources;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    const bookings = [];

    for (let i = 0; i < 40; i++) {
      const user = faker.helpers.arrayElement(users);
      const resource = faker.helpers.arrayElement(resources);

      const bookingDate = faker.date.future();
      const startHour = faker.number.int({ min: 8, max: 16 });
      const endHour = startHour + 1;

      bookings.push({
        user_id: user.id,
        resource_id: resource.id,
        booking_date: bookingDate,
        start_time: `${String(startHour).padStart(2, "0")}:00:00`,
        end_time: `${String(endHour).padStart(2, "0")}:00:00`,
        status: faker.helpers.arrayElement([
          "pending",
          "confirmed",
          "cancelled",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("bookings", bookings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
