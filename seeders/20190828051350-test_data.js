'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      const agents = await queryInterface.rawSelect('Agents', {}, ['id']);
      const skills = await queryInterface.rawSelect('Skills', {}, ['id']);
      const tasks = await queryInterface.rawSelect('Tasks', {}, ['id']);
      const agentsSkills = await queryInterface.rawSelect('AgentsSkills', {}, ['agentId']);
      const tasksSkills = await queryInterface.rawSelect('TasksSkills', {}, ['taskId']);

      if (!agents) {
        // Insert Agents
        await queryInterface.bulkInsert('Agents', [
          { 
            id: '60d3577b-4113-4f57-9917-11800c9fed45', 
            name: 'Agent1', 
            available: false,
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '11977a6e-afc6-45a3-a135-fea94c74fd03', 
            name: 'Agent2', 
            available: true, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: 'e4f08abb-1260-4b19-9658-c3cf177727ee', 
            name: 'Agent3', 
            available: false, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '59c2c021-9094-4f6a-8918-d5630393589c', 
            name: 'Agent4', 
            available: true, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '40c6ef05-eb1a-4daf-8e52-c5de55e4c540', 
            name: 'Agent5', 
            available: true, 
            createdAt: new Date(), 
            updatedAt: new Date() 
          }
        ], {});

      }

      if (!skills) {
        // Insert Skills
        await queryInterface.bulkInsert('Skills', [
          { 
            id: '2b2953e9-c648-40c9-96c8-a84cba2f0f04', 
            name: 'Skill1', 
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc', 
            name: 'Skill2', 
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f', 
            name: 'Skill3', 
            createdAt: new Date(), 
            updatedAt: new Date() 
          }
        ], {});
      }

      if (!tasks) {
        // Insert Tasks
        await queryInterface.bulkInsert('Tasks', [
          { 
            id: 'a05ead89-232f-474a-b0d3-225f292b3593', 
            name: 'Task1', 
            priority: 2, 
            assignedOn: new Date('2019-07-25T10:00:00Z'), 
            agentId: '60d3577b-4113-4f57-9917-11800c9fed45',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '89c89663-2f97-4db5-a27d-6ef86cbb96ad', 
            name: 'Task2', 
            priority: 1, 
            assignedOn: new Date('2019-08-15T13:30:00Z'),
            agentId: '11977a6e-afc6-45a3-a135-fea94c74fd03',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '58ab513f-2e72-492c-99c6-f22fcbd1e0bb', 
            name: 'Task3', 
            priority: 2, 
            assignedOn: new Date('2019-08-06T19:00:00Z'),
            agentId: 'e4f08abb-1260-4b19-9658-c3cf177727ee',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: 'c7220092-a8b2-4c0d-bb6e-3adf52cdc82d', 
            name: 'Task4', 
            priority: 1, 
            assignedOn: new Date('2019-06-29T05:00:00Z'),
            agentId: '59c2c021-9094-4f6a-8918-d5630393589c',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            id: '7640f11c-0308-4040-b11b-b8c5ef471796', 
            name: 'Task5', 
            priority: 1, 
            assignedOn: new Date('2019-08-24T17:45:00Z'),
            agentId: '40c6ef05-eb1a-4daf-8e52-c5de55e4c540',
            createdAt: new Date(), 
            updatedAt: new Date() 
          }
        ], {});
      }

      if (!agentsSkills) {
        // Insert AgentsSkills
        await queryInterface.bulkInsert('AgentsSkills', [
          {
            agentId: '60d3577b-4113-4f57-9917-11800c9fed45',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            agentId: '60d3577b-4113-4f57-9917-11800c9fed45',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },        {
            agentId: '11977a6e-afc6-45a3-a135-fea94c74fd03',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            agentId: 'e4f08abb-1260-4b19-9658-c3cf177727ee',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },        {
            agentId: 'e4f08abb-1260-4b19-9658-c3cf177727ee',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },        {
            agentId: '59c2c021-9094-4f6a-8918-d5630393589c',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            agentId: '40c6ef05-eb1a-4daf-8e52-c5de55e4c540',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            agentId: '40c6ef05-eb1a-4daf-8e52-c5de55e4c540',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            agentId: '40c6ef05-eb1a-4daf-8e52-c5de55e4c540',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          }
        ], {});
      }
      
      if (!tasksSkills) {
        // Insert TasksSkills
        await queryInterface.bulkInsert('TasksSkills', [
          {
            taskId: 'a05ead89-232f-474a-b0d3-225f292b3593',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            taskId: 'a05ead89-232f-474a-b0d3-225f292b3593',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            taskId: '89c89663-2f97-4db5-a27d-6ef86cbb96ad',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            taskId: '58ab513f-2e72-492c-99c6-f22fcbd1e0bb',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            taskId: '58ab513f-2e72-492c-99c6-f22fcbd1e0bb',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },  
          {
            taskId: 'c7220092-a8b2-4c0d-bb6e-3adf52cdc82d',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },  
          {
            taskId: '7640f11c-0308-4040-b11b-b8c5ef471796',
            skillId: '2b2953e9-c648-40c9-96c8-a84cba2f0f04',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },  
          {
            taskId: '7640f11c-0308-4040-b11b-b8c5ef471796',
            skillId: 'ab8857f6-60be-4f2b-a7e4-0239b2ecf5dc',
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          {
            taskId: '7640f11c-0308-4040-b11b-b8c5ef471796',
            skillId: '81e3fe7f-29a6-48f9-bf68-56abcf74b93f',
            createdAt: new Date(), 
            updatedAt: new Date() 
          }
        ], {});
      }
    }
    catch(err) {
      console.log(err);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AgentsSkills', null, {});
    await queryInterface.bulkDelete('TasksSkills', null, {});
    await queryInterface.bulkDelete('Agents', null, {});
    await queryInterface.bulkDelete('Skills', null, {});
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
