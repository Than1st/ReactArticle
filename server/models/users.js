'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Article)
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pendidikan: DataTypes.STRING,
    organisasi: DataTypes.STRING,
    kerja: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};