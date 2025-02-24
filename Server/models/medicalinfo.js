'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalInfo.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  MedicalInfo.init({
    user_id: DataTypes.INTEGER,
    health_conditions: DataTypes.JSON,
    medications: DataTypes.JSON,
    travel_history: DataTypes.STRING,
    vaccination_status: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'MedicalInfo',
  });
  return MedicalInfo;
};