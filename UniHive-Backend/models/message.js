"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "senderId" }); // Sender association
      this.belongsTo(models.User, { foreignKey: "receiverId" }); // Receiver association
    }
  }
  message.init(
    {
      content: DataTypes.STRING,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "message",
      tableName: "messages",
    }
  );
  return message;
};