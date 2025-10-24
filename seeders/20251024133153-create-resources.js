'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    for (let i = 0; i < 20; i++) {
      resources.push({
        name: `Dr. ${faker.name.lastName()}`,
        type: 'doctor',
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    
    for (let i = 0; i < 20; i++) {
      const restaurantName = `${faker.company.bsAdjective()} ${faker.company.companyName()}`;
      resources.push({
        name: restaurantName,
        type: 'restaurant',
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    
    for (let i = 0; i < 20; i++) {
      const roomName = `Meeting Room ${faker.word.adjective()} ${faker.word.noun()}`;
      resources.push({
        name: roomName,
        type: 'meeting room',
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resources', null, {});
  }
};
