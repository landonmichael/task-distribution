'use strict'

const taskService = require('../services/taskService');

// Create task endpoint /api/tasks
const create = async function(req, res) {
    try {
        const task = await taskService.create(req.body);
        return res.status(200).send(task.toDto());
    }
    catch(err) {
        return res.status(err.status).send(err);
    }
}

// Complete task endpoint /api/tasks/{id}/complete
const completeTask = async function(req, res) {
    try {
        await taskService.completeTask(req.params.id);
        return res.status(204).send();
    }
    catch(err) {
        return res.status(err.status).send(err);
    }
}

module.exports = {
    create: create,
    completeTask: completeTask
}