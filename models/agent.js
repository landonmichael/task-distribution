'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    name: DataTypes.STRING
  }, {});
  Agent.associate = function(models) {
    // Agent-Skill many-to-many relationship
    Agent.belongsToMany(models.Skill, { through: 'AgentsSkills', foreignKey: 'agentId', as: 'skills'});
  };
  return Agent;
};