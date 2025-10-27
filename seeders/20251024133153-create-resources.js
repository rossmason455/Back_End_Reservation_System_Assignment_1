'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { faker } = await import('@faker-js/faker');
    const resources = [];
    for (let i = 0; i < 20; i++) {
      resources.push({
        name: `Dr. ${faker.person.lastName()}`,
        type: 'doctor',
        status: 'available',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    
    for (let i = 0; i < 20; i++) {
      const restaurantName = `${faker.company.buzzAdjective()} ${faker.company.name()}`;
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

    await queryInterface.bulkInsert('resources', resources, {});
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resources', null, {});
  }
};
