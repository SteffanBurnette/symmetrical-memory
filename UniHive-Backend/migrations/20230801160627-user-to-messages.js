"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("messages", {
      fields: ["senderId"],
      type: "foreign key",
      name: "custom_fkey_message_to_user",
      references: {
        table: "User", // Updated to refer to the User table
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "messages",
      "custom_fkey_message_to_user"
    );
  },
};