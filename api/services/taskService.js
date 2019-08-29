'use strict'

const db = require('../../models');
const agentService = require('./agentService');
const skillService = require('./skillService');

const create = async function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await validateTask(task);
            if (result.errors.length == 0) {
                // Get all available agents.
                const agents = await agentService.getAvailable();
                if (agents) {
                    // Priorities
                    // 1. Look for Agents without any tasks assigned.
                    // 2. Look for Agents who have tasks assigned but are low priority.
                    // 3. If all Agents are assigned same priority tasks, choose the Agent with the most 
                    // recently assigned task (if the new task is higher priority).

                    let newTask;
                    // First check for agents without any tasks assigned.
                    newTask = await assignToTaskless(agents, task);
                    if (newTask)
                        resolve(newTask);
                } else {
                    reject({
                        status: 200,
                        message: 'Agents Unavailable',
                        error: 'There are no Agents available to handle your new Task request. ' +
                            'Please try again at another time.'
                    });
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

const assignToLowerPriority = function(agents, task) {

}

// Attempt to assign task to an agent without any tasks (if they have the correct skills).
const assignToTaskless = async function(agents, task) {
    return new Promise(async (resolve, reject) => {
        try {
            agents.forEach(agent => {
                // If the agent does not have any tasks assigned.
                if (agent.tasks.length == 0) {
                    // If the agent has all of the skills.
                    if (agentHasAllSkills(agent, task.skills)) {
                        task.agentId = agent.id;
                        task.assignedOn = new Date();
                        // Assign the task to the agent.
                        const newTask = await assignNewTask(task);
                        resolve(newTask);
                    }
                }
            });
            resolve(null);
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

// Assigns a new task to an agent.
const assignNewTask = function(task) {
    return new Promise((resolve, reject) => {
        db.Task.Create(task)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

// Determines if an agent has all skills required for a task.
const agentHasAllSkills = function(agent, taskSkills) {
    let hasSkills = true;
    taskSkills.forEach(taskSkill => {
        if (!agent.some(x => x.skills.id === taskSkill)) {
            hasSkills = false; break;
        }
    });
    return hasSkills;
}

// Validates a Task with basic validation rules.
const validateTask = async function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            const errorResponse = {
                status: 400,
                message: 'Validation Error',
                errors: []
            }

            // Validate task
            if (task == null) 
                errorResponse.errors.push(
                    { message: 'Task is required.' });
            else {
                // Validate task name
                if (task.name == null || task.name.length === 0)
                    errorResponse.errors.push(
                        { field: 'name', message: 'Name is required.' });
                else 
                    if (task.name.length > 10)
                        errorResponse.errors.push(
                            { field: 'name', message: 'Name cannot exceed 10 characters.'});
                // Validate task priority
                if (task.priority == null)
                    errorResponse.errors.push(
                        { field: 'priority', message: 'Priority is required.' });
                else
                    if (task.priority != 1 && task.priority != 2)
                        errorResponse.errors.push(
                            { field: 'priority', message: 'Priority value must be 1 or 2.' });
                // Validate task skills
                if (task.skills && Array.isArray(task.skills) && task.skills.length > 0) {
                    const skills = await skillService.getAll();
                    for (let i = 0; i < task.skills.length; i++) {
                        if (!skills.some(x => x.id === task.skills[i]))
                            errorResponse.errors.push(
                                { field: `skills[${i}]`, message: `Skill Id '${task.skills[i]}' is not valid.` });
                    }
                } else {
                    errorResponse.errors.push({ 
                        field: 'skills', message: 'Skills is required.' });
                }       
            }

            resolve(errorResponse);
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

module.exports = {
    create: create
}