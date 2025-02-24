'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consent.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Consent.init({
    user_id: DataTypes.INTEGER,
    terms_accepted: DataTypes.BOOLEAN,
    privacy_policy_accepted: DataTypes.BOOLEAN,
    medical_consent_accepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Consent',
  });
  return Consent;
};