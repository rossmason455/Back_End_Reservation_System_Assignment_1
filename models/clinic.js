'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clinic.init({
   id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      clinic_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
     
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};