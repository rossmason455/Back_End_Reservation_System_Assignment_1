'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {

    }
  }
  User.init({
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
       password: {
      type: Sequelize.STRING,
      allowNull: false
    },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};