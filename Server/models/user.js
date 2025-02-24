'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       User.hasOne(models.Profile, { foreignKey: "user_id" });
       User.hasOne(models.MedicalInfo, { foreignKey: "user_id" });
       User.hasOne(models.Verification, { foreignKey: "user_id" });
       User.hasOne(models.Consent, { foreignKey: "user_id" });
       User.hasOne(models.Community, { foreignKey: "user_id" });
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};