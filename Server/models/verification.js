'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Verification.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Verification.init({
    user_id: DataTypes.INTEGER,
    government_id_url: DataTypes.STRING,
    photograph_url: DataTypes.STRING,
    medical_certificate_url: DataTypes.STRING,
    verification_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Verification',
  });
  return Verification;
};