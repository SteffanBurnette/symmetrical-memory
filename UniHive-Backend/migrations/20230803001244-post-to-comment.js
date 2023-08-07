'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('comments', {
      fields: ['postId'], // The column you want to add the foreign key to
      type: 'foreign key',
      name: 'custom_fkey_comment_to_post', // Name for the foreign key constraint
      references: {
        table: 'posts', // Referenced table name
        field: 'id',   // Referenced column name
      },
      onDelete: 'cascade', // or 'restrict', 'set null', 'no action', depending on your needs
      onUpdate: 'cascade', // or 'restrict', 'set null', 'no action', depending on your needs
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'custom_fkey_comment_to_post');
  }
};