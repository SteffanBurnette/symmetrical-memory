"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("posts", {
      fields: ["groupId"],
      type: "foreign key",
      name: "custom_fkey_posts_to_groups",
      references: {
        // Required field
        table: "groups",
        field: "id",
      },
      onDelete: "cascade", // or 'restrict', 'set null', 'no action', depending on your needs
      onUpdate: "cascade", // or 'restrict', 'set null', 'no action', depending on your needs
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      "posts",
      "custom_fkey_posts_to_groups"
    );
  },
};