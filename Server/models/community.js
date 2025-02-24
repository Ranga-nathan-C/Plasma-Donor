'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Community.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Community.init({
    user_id: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    interests: DataTypes.JSON,
    social_media_links: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Community',
  });
  return Community;
};