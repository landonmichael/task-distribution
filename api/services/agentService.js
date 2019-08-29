'use strict'

const db = require('../../models');

// Returns all available Agents.
const getAvailable = function() {
    return new Promise((resolve, reject) => {
        db.Agent.findAll({
            where: { available: true }, include: ['tasks','skills']
        })
        .then(agents => {
            resolve(agents);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

// Returns an Agent by Id.
const getById = function(id) {
    return new Promise((resolve, reject) => {
        db.Agent.findOne({
            where: { id: id }, include: ['tasks','skills']
        })
        .then(agent => {
            resolve(agent);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {
    getAvailable: getAvailable,
    getById: getById
}
