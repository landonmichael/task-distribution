'use strict'

const agentService = require('../../api/services/agentService');
const skillService = require('../../api/services/skillService');
const sinon = require('sinon');
const expect = require('chai').expect;
const rewire = require('rewire');
const db = require('../../models');
const testData = require('../test-data');

describe('taskService', () => {
    let taskService, validateTask, assignToTasklessAgent, assignToAgent,
    agentHasAllSkills, assignNewTask;
    beforeEach(() => {
        taskService = rewire('../../api/services/taskService');
    });
    afterEach(() => {
        sinon.restore();
    });
    describe('getById', () => {
        it('should return a Task by Id', async () => {
            sinon.stub(db.Task, 'findOne')
                .returns(Promise.resolve(testData.tasks[0]));
            const result = await taskService.getById(testData.tasks[0].id)
            expect(result.id).to.equals(testData.tasks[0].id);
        });
    });
    describe('create', () => {
        beforeEach(() => {
            validateTask = sinon.stub();
            assignToTasklessAgent = sinon.stub();
            assignToAgent = sinon.stub();
            agentHasAllSkills = sinon.stub();
            assignNewTask = sinon.stub();
        });
        it('should create a new Task and assign to an Agent without any Tasks already assigned', async () => {
            validateTask.onCall(0).returns({
                status: 400,
                message: 'Validation Error',
                errors: []
            });

            sinon.stub(agentService, 'getTaskless')
                .returns(Promise.resolve(testData.agentsWithoutTasks));

            assignToTasklessAgent.onCall(0)
                .returns(Promise.resolve(testData.newlyCreatedLowPriorityTask));

            agentHasAllSkills.onCall(0)
                .returns(true);

            assignNewTask.onCall(0)
                .returns(testData.newlyCreatedLowPriorityTask);

            taskService.__set__({
                'validateTask': validateTask,
                'assignToAgent': assignToAgent,
                'agentHasAllSkills': agentHasAllSkills,
                'assignNewTask': assignNewTask
            });

            const result = await taskService.create(testData.validCreateLowPriorityTask);
            expect(result).to.equals(testData.newlyCreatedLowPriorityTask);
        });
        it('should create a new Task and assign to an Agent with an already assigned low-priority Task', async () => {
            validateTask.onCall(0).returns({
                status: 400,
                message: 'Validation Error',
                errors: []
            });

            sinon.stub(agentService, 'getTaskless')
                .returns([]);
            
            sinon.stub(agentService, 'getAllWithTasks')
                .returns(Promise.resolve(testData.agentsWithTasks));
            
            assignToAgent.onCall(0)
                .returns(testData.newlyCreatedHighPriorityTask);

            agentHasAllSkills.onCall(1)
                .returns(true);

            assignNewTask.onCall(0)
                .returns(testData.newlyCreatedHighPriorityTask);
            
            taskService.__set__({
                'validateTask': validateTask,
                'assignToAgent': assignToAgent,
                'agentHasAllSkills': agentHasAllSkills,
                'assignNewTask': assignNewTask
            });

            const result = await taskService.create(testData.validCreateHighPriorityTask);
            expect(result).to.equals(testData.newlyCreatedHighPriorityTask);
            expect(result.agentId).to.equals(testData.agentsWithTasks[1].id);
        });
        it('should create a new Task and assign to an Agent with the last assigned low-priority Task', async () => {
            validateTask.onCall(0).returns({
                status: 400,
                message: 'Validation Error',
                errors: []
            });

            sinon.stub(agentService, 'getTaskless')
                .returns([]);
            
            sinon.stub(agentService, 'getAllWithTasks')
                .returns(Promise.resolve(testData.agentsWithAllLowPriorityTasks));

            assignToAgent.onCall(0)
                .returns(testData.newlyCreatedHighPriorityTask);
            
            agentHasAllSkills.onCall(0)
                .returns(true);
            agentHasAllSkills.onCall(1)
                .returns(true);
            agentHasAllSkills.onCall(2)
                .returns(true);
            
            assignNewTask.onCall(0)
                .returns(testData.newlyCreatedHighPriorityTask);

            taskService.__set__({
                'validateTask': validateTask,
                'assignToAgent': assignToAgent,
                'agentHasAllSkills': agentHasAllSkills,
                'assignNewTask': assignNewTask
            });

            const result = await taskService.create(testData.validCreateHighPriorityTask);
            expect(result).to.equals(testData.newlyCreatedHighPriorityTask);
            expect(result.agentId).to.equals(testData.agentsWithAllLowPriorityTasks[1].id);
        });
    });
});