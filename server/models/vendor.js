'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vendor.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    kualitas_bahan: DataTypes.INTEGER,
    model_seragam: DataTypes.INTEGER,
    waktu_pengerjaan: DataTypes.INTEGER,
    kualitas_produk: DataTypes.INTEGER,
    tempo_pembayaran: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vendor',
  });
  return vendor;
};