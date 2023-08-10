"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.post, { foreignKey: "userId" }); // Updated to "post"
      this.hasMany(models.message, { foreignKey: "senderId" }); // No change needed
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      college_level: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      college: DataTypes.STRING,
      major: DataTypes.STRING,
      course_intrest: DataTypes.STRING,
      image: DataTypes.BLOB, 
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  );
  return User;
};