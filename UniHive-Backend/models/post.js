"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comment, { foreignKey: "postId" });
    }
  }
  post.init(
    {
      post_content: DataTypes.STRING,
      isSwarm: DataTypes.BOOLEAN,
      swarmLocation: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "post",
      tableName: "posts",
    }
  );
  return post;
};