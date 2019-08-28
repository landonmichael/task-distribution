'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    assignedOn: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // Task-Agent many-to-one relationship
    Task.belongsTo(models.Agent, { foreignKey: 'agentId' });
    models.Agent.hasMany(Task, { foreignKey: 'agentId' });
    // Task-Skill many-to-many relationship
    Task.belongsToMany(models.Skill, { through: 'TasksSkills', foreignKey: 'taskId', as: 'skills'});
  };
  return Task;
};