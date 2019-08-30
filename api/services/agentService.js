'use strict'

const db = require('../../models');
const Op = db.Sequelize.Op;

// Returns all agents with non-completed tasks.
const getAllWithTasks = function() {
    return new Promise((resolve, reject) => {
        db.Agent.findAll({
            include:[{
                as: 'tasks',
                model: db.Task,
                where: { completed: false },
            }, 'skills']
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

// Returns all agents who do not have any tasks assigned.
const getTaskless = function() {
    return new Promise((resolve, reject) => {
        db.Agent.findAll({
            attributes: ['id'],
            include:[{
                as: 'tasks',
                model: db.Task,
                where: { completed: false },
            }]
        })
        .then(agents => {
            const ids =[];
            agents.forEach(agent => {
                ids.push(agent.id);
            });
            db.Agent.findAll({
                where: { 
                    id: { [Op.notIn]: ids } 
                }, 
                include: ['skills']
            }).then(agents => {
                resolve(agents);
            })
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
    getAllWithTasks: getAllWithTasks,
    getTaskless: getTaskless,
    getById: getById
}
