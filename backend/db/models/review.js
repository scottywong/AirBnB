'use strict';
const {
  Model
} = require('sequelize');

// const {Image} = require('../../db/models');
// const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Review.belongsTo(models.User,{
        foreignKey: 'userId'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });

      Review.hasMany(models.Image, {
        foreignKey: 'imageableId',
        onDelete: 'cascade', 
        hooks: true
      })
    }

    // getImages(){
    //   return Image.findAll({
    //     where: {
    //       [Op.and]: [
    //       {imageableType: 'Review'},
    //       {imageableId: this.id}
    //       ]
    //     }
    //   });
    // }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};