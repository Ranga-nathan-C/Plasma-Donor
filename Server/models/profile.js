'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Profile.init({
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    blood_type: DataTypes.STRING,
    emergency_contact_name: DataTypes.STRING,
    emergency_contact_phone: DataTypes.STRING,
    notification_preferences: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};