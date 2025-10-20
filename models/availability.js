'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availability.init({
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Doctors'
        }
      },
      available_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
       status: {
        type: DataTypes.ENUM('available', 'booked', 'blocked'),
        defaultValue: 'available'
      }
    },
   {
         sequelize,
      modelName: 'Availability',
      tableName: 'Availability',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          unique: true,
          fields: ['doctor_id', 'start_datetime', 'end_datetime']
        }
      ]
    
  });
  return Availability;
};