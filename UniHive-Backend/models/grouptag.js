"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupTag extends Model {
    static associate(models) {
      GroupTag.belongsTo(models.group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
      GroupTag.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  GroupTag.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GroupTag",
      tableName: "GroupTag",
    }
  );
  return GroupTag;
};