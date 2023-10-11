'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.JSON
      },
      address: {
        type: Sequelize.STRING
      },
      busynessScore: {
        type: Sequelize.JSONB
      },
      currentBusynessScore: {
        type: Sequelize.JSONB
      },
      lastScore: {
        type: Sequelize.FLOAT
      },
      lastScoreTime: {
        type: Sequelize.DATE
      },
      openHours: {
        type: Sequelize.JSON
      },
      isSponsored: {
        type: Sequelize.BOOLEAN
      },
      isAlwaysHot: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Venues');
  }
};