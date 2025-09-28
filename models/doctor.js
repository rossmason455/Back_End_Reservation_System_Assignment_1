'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Doctor extends Model {
    static associate(models) {
    
      Doctor.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  Doctor.init(
    {
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      specialization: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Clinics',       
        }
      }
    },
    {
      sequelize,
      modelName: 'Doctor',
    }
  );

  return Doctor;
};
