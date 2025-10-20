'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Availabilities', {
           id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Doctors',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      available_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
       status: {
        type: Sequelize.ENUM('available', 'booked', 'blocked'),
        defaultValue: 'available'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

        await queryInterface.addConstraint('Availability', {
      type: 'unique',
      fields: ['doctor_id', 'start_datetime', 'end_datetime'],
      name: 'unique_doctor_slot'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Availabilities');
  }
};