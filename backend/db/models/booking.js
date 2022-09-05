'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });      
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Booking.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        checkEndDate(value) {
          if (value <= this.startDate) {
            throw new Error("End Date must be after Start Date");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      publicBookings: {
        attributes: { include: ["spotId","startDate","endDate"] , exclude: ["id","createdAt", "updatedAt"] }
      }
    }
  });
  return Booking;
};