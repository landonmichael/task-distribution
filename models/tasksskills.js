'use strict';
module.exports = (sequelize, DataTypes) => {
  const TasksSkills = sequelize.define('TasksSkills', {
    taskId: DataTypes.UUID,
    skillId: DataTypes.UUID
  }, {});
  TasksSkills.associate = function(models) {
    // Task-Skill many-to-many relationship
    TasksSkills.belongsTo(models.Task, { foreignKey: 'taskId' });
    TasksSkills.belongsTo(models.Skill, { foreignKey: 'skillId' });
  };
  return TasksSkills;
};