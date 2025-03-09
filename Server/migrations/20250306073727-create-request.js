'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientName: {
        type: Sequelize.STRING
      },
      bloodGroup: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      requesterName: {
        type: Sequelize.STRING
      },
      relation: {
        type: Sequelize.STRING
      },
      hospitalName: {
        type: Sequelize.STRING
      },
      numberOfPatients: {
        type: Sequelize.INTEGER
      },
      urgency: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      userId: {
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
    await queryInterface.dropTable('Requests');
  }
};