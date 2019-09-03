'use strict'

const agentService = require('../services/agentService');

const getAllWithTasks = async function(req, res) {
    try {
        const agents = await agentService.getAllWithTasks();
        const result = [];
        tasks.forEach(agents => {
            result.push(agent.toDto());
        });
        return res.status(200).send(result);
    } catch(err) {
        return res.status(500).send({
            status: 500,
            message: 'Server Error',
            error: 'An unexpected error occured. Please try again at a later time.'
        });
    }
}

module.exports = {
    getAllWithTasks: getAllWithTasks
}
