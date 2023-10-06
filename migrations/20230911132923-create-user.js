'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      avatar: {
        type: Sequelize.STRING(511),
      },
      salt: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      facebookAccessToken: {
        type: Sequelize.STRING(511),
      },
      googleIdToken: {
        type: Sequelize.TEXT,
      },
      facebookID: {
        type: Sequelize.STRING,
      },
      googleID: {
        type: Sequelize.STRING,
      },
      appleID: {
        type: Sequelize.STRING,
      },
      appleIdToken: {
        type: Sequelize.STRING,
      },
      referralCode: {
        type: Sequelize.STRING,
      },
      isFirstLogin: {
        type: Sequelize.BOOLEAN,
      },
      isVisibleOnMap: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_gender";');

  }
};