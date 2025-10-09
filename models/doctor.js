'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
    
      Doctor.belongsTo(models.Clinic, {
        foreignKey: 'clinic_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });


       Doctor.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });


    }
  }

  Doctor.init(

    
    {


       user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      
      },
      specialization: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Clinics',       
        }
      }
    },
    {
      sequelize,
      modelName: 'Doctor',
       timestamps: true,        
    createdAt: 'created_at',   
    updatedAt: 'updated_at'
    }
  );

  return Doctor;
};
