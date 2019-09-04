'use strict'

const skillService = require('../../api/services/skillService');
const sinon = require('sinon');
const expect = require('chai').expect;
const db = require('../../models');
const skills = require('../test-data').skills;

describe('skillService', () => {
    describe('getAll', () => {
        it('should return all Skills', async () => {
            sinon.stub(db.Skill, 'findAll')
                .returns(Promise.resolve(skills));
            const result = await skillService.getAll();
            expect(result).to.equals(skills);
        });
    });
});