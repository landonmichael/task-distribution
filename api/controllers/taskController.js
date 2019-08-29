'use strict'

const taskService = require('../services/taskService');

const create = async function(req, res) {
    try {
        const task = await taskService.create(req.body);
        return res.status(200).send(task);
    }
    catch(err) {
        return res.status(err.status).send(err);
    }
}

const update = function(req, res) {
    return res.status(200);
}

module.exports = {
    create: create,
    update: update
}