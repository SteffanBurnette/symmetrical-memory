"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_name: {
        type: Sequelize.STRING,
      },
      group_description: {
        type: Sequelize.TEXT,
      },
      group_location: {
        type: Sequelize.STRING,
      },
      college_major: {
        type: Sequelize.STRING,
      },
      group_college: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      postsId: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("groups");
  },
};