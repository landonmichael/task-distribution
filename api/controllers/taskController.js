'use strict'

const agentService = require('../services/agentService');

const create = async function(req, res) {
    try {
        const agents = await agentService.getAvailable();
        return res.status(200).send(agents);
    }
    catch(err) {
        console.log(err);
    }
}

const update = function(req, res) {
    return res.status(200);
}

module.exports = {
    create: create,
    update: update
}