'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
       User.hasMany(models.Booking, { foreignKey: 'user_id' });
      
    }
  }
  User.init({
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
       password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      role: {
  type: DataTypes.ENUM('user', 'admin'),
  allowNull: false,
  defaultValue: 'user'
}
     
  }, {
    sequelize,
    modelName: 'User',
     timestamps: true,         
    createdAt: 'created_at',  
    updatedAt: 'updated_at'
  });
  return User;
};