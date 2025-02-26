'use strict';
const {
  Model
// eslint-disable-next-line no-undef
} = require('sequelize');
// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};