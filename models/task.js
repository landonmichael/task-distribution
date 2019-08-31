'use strict';
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    assignedOn: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    completedOn: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // Task-Agent many-to-one relationship
    Task.belongsTo(models.Agent, { foreignKey: 'agentId', as: 'agent' });
    // Task-Skill many-to-many relationship
    Task.belongsToMany(models.Skill, { through: 'TasksSkills', foreignKey: 'taskId', as: 'skills' });
  };
  Task.beforeCreate(task => task.id = uuid());

  Task.prototype.toDto = function() {
    const dto = {};
    if (this.id)
      dto['id'] = this.id;
    if (this.name)
      dto['name'] = this.name;
    if (this.priority)
      dto['priority'] = this.priority;
    if (this.assignedOn)
      dto['assignedOn'] = this.assignedOn;
    if (this.agentId) 
      dto['agentId'] = this.agentId;
    if (this.completed)
      dto['completed'] =  this.completed;
    if (this.completedOn)
      dto['completedOn'] =  this.completedOn;
    if (this.skills) {
      dto.skills = [];
      this.skills.forEach(skill => {
        dto.skills.push({
          id: skill.dataValues.id,
          name: skill.dataValues.name
        });
      });
    }
      return dto;
  }

  return Task;
};