'use strict';
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    name: DataTypes.STRING
  }, {});
  Agent.associate = function(models) {
    // Agent-Task one-to-many relationship.
    Agent.hasMany(models.Task, { as: 'tasks' });
    // Agent-Skill many-to-many relationship
    Agent.belongsToMany(models.Skill, { through: 'AgentsSkills', foreignKey: 'agentId', as: 'skills' });
  };
  Agent.beforeCreate(user => user.id = uuid());

  Agent.prototype.toDto = function() {
    const dto = {};
    if (this.id)
      dto['id'] = this.id;
    if (this.name)
      dto['name'] = this.name;
    if (this.tasks) {
      dto.tasks = [];
      this.tasks.forEach(task => {
        dto.tasks.push({
          id: task.dataValues.id,
          name: task.dataValues.name
        });
      }); 
    }
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

  return Agent;
};