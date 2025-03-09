'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.associate = (models) => {
        Request.belongsTo(models.User, { foreignKey: "userId" });
        Request.belongsTo(models.UserStatus, { foreignKey: "userId" });
      };
    }
  }
  Request.init({
    patientName: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    location: DataTypes.STRING,
    contact: DataTypes.STRING,
    requesterName: DataTypes.STRING,
    relation: DataTypes.STRING,
    hospitalName: DataTypes.STRING,
    numberOfPatients: DataTypes.INTEGER,
    urgency: DataTypes.STRING,
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};