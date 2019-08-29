'use strict'

const db = require('../../models');

// Returns all available Agents.
const getAvailable = async function() {
    try {
        return await db.Agent.findAll({
            where: {available: true}, include: ['tasks','skills']
        });
    }
    catch(err) {
        console.log(err);
    }
}

// Returns an Agent by Id.
const getById = function(id) {
    return db.Agent.findOne({
        where: {id: id}, include: ['tasks', 'skills']
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log(`Error while finding Agent with Id ${id}:`, err);
    });
}

module.exports = {
    getAvailable: getAvailable,
    getById: getById
}
