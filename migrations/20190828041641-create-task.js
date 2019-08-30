'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.INTEGER
      },
      assignedOn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      agentId: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      completedOn: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};