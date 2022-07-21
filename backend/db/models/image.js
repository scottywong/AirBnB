'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId'
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId'
      });

    }

    static getReviewImages() {

      return Image.findAll({where: {imageableType: 'Review'}});
    }
    
    static getSpotImages() {
      return Image.findAll({where: {imageableType: 'Spot'}});
    }
  }
  
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    imageableType: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
    }
  });
  return Image;
};