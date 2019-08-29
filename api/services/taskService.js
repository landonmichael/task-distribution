'use strict'

const db = require('../../models');
const agentService = require('../services/agentService');

const create = async function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = validateTask(task);
            if (result.errors.length == 0) {
                const agents = await agentService.getAvailable();
                if (agents) {
                    // Add other business rules.
                    resolve();
                } else {
                    reject({
                        status: 200,
                        message: 'Agents Unavailable',
                        error: 'There are no available Agents to handle your new Task request. ' +
                            'Please try again at another time.'
                    })
                }
            } else {
                reject(result);
            }
        }
        catch(err) {
            console.log(err);
            reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
            });
        }
    });
}

// Validates a Task with basic validation rules.
const validateTask = function(task) {
    const errorResponse = {
        status: 400,
        message: 'Validation Error',
        errors: []
    }

    if (task == null) 
        errorResponse.errors.push(
            { message: 'Task is required.' });
    else {
        if (task.name == null || task.name.length === 0)
            errorResponse.errors.push(
                { field: 'name', message: 'Name is required.' });
        else 
            if (task.name.length > 10)
                errorResponse.errors.push(
                    { field: 'name', message: 'Name cannot exceed 10 characters.'});
        if (task.priority == null)
            errorResponse.errors.push(
                { field: 'priority', message: 'Priority is required.' });
        else
            if (task.priority != 1 || task.priority != 2)
                errorResponse.errors.push(
                    { field: 'priority', message: 'Priority value must be 1 or 2.' });
    }

    return errorResponse;
}

module.exports = {
    create: create
}