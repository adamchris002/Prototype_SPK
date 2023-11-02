'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hasil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hasil.init({
    name: DataTypes.STRING,
    nilai_tertinggi: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'hasil',
  });
  return hasil;
};