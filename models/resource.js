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
        type: DataTypes.ENUM('doctor', 'meeting room', 'restaurant table'),
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('available', 'unavailable'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Resource',
    }
  );

  return Resource;
};
