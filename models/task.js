'use strict';
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    assignedOn: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // Task-Agent many-to-one relationship
    Task.belongsTo(models.Agent, { foreignKey: 'agentId', as: 'agent' });
    // Task-Skill many-to-many relationship
    Task.belongsToMany(models.Skill, { through: 'TasksSkills', foreignKey: 'taskId', as: 'skills' });
  };
  Task.beforeCreate(task => task.id = uuid());
  return Task;
};