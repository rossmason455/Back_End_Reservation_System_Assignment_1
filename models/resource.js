'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    static associate(models) {
      Resource.hasMany(models.Booking, {
        foreignKey: 'resource_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Resource.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('doctor', 'meeting room', 'restaurant table'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('available', 'unavailable'),
        allowNull: false
      },
       createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'  
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'  
      }
      
    },
    {
      sequelize,
      modelName: 'Resource',
    }
  );

  return Resource;
};
