'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: DataTypes.STRING
  }, {});
  Skill.associate = function(models) {
    // Skill-Task many-to-many relationship
    Skill.belongsToMany(models.Task, { through: 'TasksSkills', foreignKey: 'skillId', as: 'tasks' });
    // Skill-Agent many-to-many relationship
    Skill.belongsToMany(models.Agent, { through: 'AgentsSkills', foreignKey: 'skillId', as: 'agents'});
  };
  return Skill;
};