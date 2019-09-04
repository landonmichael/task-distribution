'use strict'

const agentService = require('../../api/services/agentService');
const sinon = require('sinon');
const expect = require('chai').expect;
const db = require('../../models');
const testData = require('../test-data');

describe('agentService', () => {
    afterEach(() => {
        sinon.restore();
    });
    describe('getAllWithTasks', () => {
        it('should return an array of Agents including their Skills and non-completed Tasks', async () => {
            sinon.stub(db.Agent, 'findAll')
                .returns(Promise.resolve(testData.agentsWithTasks));
            const result = await agentService.getAllWithTasks();
            expect(result).to.equals(testData.agentsWithTasks);
        });
    });
    describe('getTaskless', () => {
        it('should return an array of Agents without any non-completed Tasks', async () => {
            sinon.stub(db.Agent, 'findAll')
                .returns(Promise.resolve(testData.agentsWithoutTasks));
            const result = await agentService.getTaskless();
            expect(result).to.equals(testData.agentsWithoutTasks);
        });
    });
    describe('getById', () => {
        it('should return an Agent by Id', async () => {
            sinon.stub(db.Agent, 'findOne')
                .returns(Promise.resolve(testData.allAgents[0]));
            const result = await agentService.getById(testData.allAgents[0].id);
            expect(result.id).to.equal(testData.allAgents[0].id);
        });
    });
});