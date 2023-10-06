'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvitationsUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invitationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Invitations'
          },
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      seeFirstTime: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.ENUM('Sent', 'Going', 'Declined', 'Canceled')
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
  async down(queryInterface) {
    await queryInterface.dropTable('InvitationsUsers');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_InvitationsUsers_status";');

  }
};