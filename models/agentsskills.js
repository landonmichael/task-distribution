'use strict';
module.exports = (sequelize, DataTypes) => {
  const AgentsSkills = sequelize.define('AgentsSkills', {
    agentId: DataTypes.UUID,
    skillId: DataTypes.UUID
  }, {});
  AgentsSkills.associate = function(models) {
    // Agent-Skill many-to-many relationship
    AgentsSkills.belongsTo(models.Agent, { foreignKey: 'agentId' });
    AgentsSkills.belongsTo(models.Skill, { foreignKey: 'skillId' });
  };
  return AgentsSkills;
};