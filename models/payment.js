'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Payment.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Bookings' }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false
      },
      payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
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
      modelName: 'Payment',
    }
  );

  return Payment;
};
