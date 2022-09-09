'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId", 
        onDelete: 'cascade', 
        hooks: true
      });
      Spot.hasMany(models.Review,{
        foreignKey: 'spotId',
        onDelete: 'cascade', 
        hooks: true
      });
      Spot.belongsTo(models.User,{
        as: 'Owner',
        foreignKey: 'ownerId'
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avgStarRating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};