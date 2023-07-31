'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group.init({
    group_name: DataTypes.STRING,
    group_description: DataTypes.TEXT,
    group_location: DataTypes.STRING,
    college_major: DataTypes.STRING,
    group_college: DataTypes.STRING,
    groupToUser: DataTypes.INTEGER,
    groupToPost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};