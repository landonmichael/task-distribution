'use strict';
const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    name: DataTypes.STRING,
    available: DataTypes.INTEGER
  }, {});
  Agent.associate = function(models) {
    // Agent-Task one-to-many relationship.
    Agent.hasMany(models.Task, { as: 'tasks' });
    // Agent-Skill many-to-many relationship
    Agent.belongsToMany(models.Skill, { through: 'AgentsSkills', foreignKey: 'agentId', as: 'skills' });
  };
  Agent.beforeCreate(user => user.id = uuid());
  return Agent;
};