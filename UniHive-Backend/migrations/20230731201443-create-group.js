'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_name: {
        type: Sequelize.STRING
      },
      group_description: {
        type: Sequelize.TEXT
      },
      group_location: {
        type: Sequelize.STRING
      },
      college_major: {
        type: Sequelize.STRING
      },
      group_college: {
        type: Sequelize.STRING
      },
      groupToUser: {
        type: Sequelize.INTEGER
      },
      groupToPost: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('groups');
  }
};