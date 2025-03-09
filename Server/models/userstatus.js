'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserStatus.associate = (models) => {
        UserStatus.belongsTo(models.User, {
          foreignKey: "userId",
          onDelete: "CASCADE",
        });
      };

    }
  }
  UserStatus.init({
    userId: DataTypes.INTEGER,
    isOnline: DataTypes.BOOLEAN,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'UserStatus',
  });
  return UserStatus;
};