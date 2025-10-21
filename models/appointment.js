'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {

      Appointment.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


      Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

        Appointment.belongsTo(models.Availability, {
        foreignKey: 'availability_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Appointment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users'

        }
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Doctors'

        }
      },

      availability_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: 'Availability'
        }
      },
      
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    },
    {
      sequelize,
      modelName: 'Appointment',
    }
  );

  return Appointment;
};
