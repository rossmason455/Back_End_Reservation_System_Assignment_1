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
      }
    },
    {
      sequelize,
      modelName: 'Availability',
    
  }, {
    sequelize,
    modelName: 'Availability',
  });
  return Availability;
};