'use strict'

const db = require('../../models');
const agentService = require('./agentService');
const skillService = require('./skillService');

const noAgentsError = 'There are no Agents available to handle your new Task request. ' +
                      'Please try again at another time.'

// Returns a Task by Id.
const getById = function(id) {
    return new Promise((resolve, reject) => {
        db.Task.findOne({
            where: { id: id }, include: ['skills']
        })
        .then(task => {
            resolve(task);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

// Creates a new Task and assigns to an Agent.
const create = async function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await validateTask(task);
            if (result.errors.length == 0) {
                // Get all agents.
                const agents = await agentService.getAll();
                if (agents) {
                    let newTask;
                    // First check for agents without any tasks assigned.
                    const tasklessAgents = agents.filter(x => x.tasks.length === 0);
                    if (tasklessAgents.length > 0) {
                        newTask = await assignToTaskless(tasklessAgents, task);
                        if (newTask)
                            resolve(newTask);
                    }
                    // Next check for agents with tasks that are low priority.
                    const lowerPriorityAgents = agents.filter(x => x.tasks.length > 0 && 
                        x.tasks.some(y => y.priority === 1));
                    if (lowerPriorityAgents.length > 0) {
                        newTask = await assignToLowerPriority(lowerPriorityAgents, task);
                        if (newTask)
                            resolve(newTask);
                    }
                    reject({
                        status: 200,
                        message: 'Agents Unavailable',
                        error: noAgentsError
                    });
                } else {
                    reject({
                        status: 200,
                        message: 'Agents Unavailable',
                        error: noAgentsError
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

// Attempt to assign task to an agent with lower priority tasks (if they have the correct skills).
const assignToLowerPriority = function(agents, task) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < agents.length; i++) {

            }
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

// Attempt to assign task to an agent without any tasks (if they have the correct skills).
const assignToTaskless = async function(agents, task) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < agents.length; i++) {
                // If the agent does not have any tasks assigned.
                if (agents[i].tasks.length == 0) {
                    // If the agent has all of the skills.
                    if (agentHasAllSkills(agents[i], task.skills)) {
                        task.agentId = agents[i].id;
                        task.assignedOn = new Date();
                        // Assign the task to the agent.
                        const newTask = await assignNewTask(task);
                        resolve(newTask);
                        break;
                    }
                }
            }
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
const assignNewTask = async function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            const savedTask = await db.Task.create(task);
            task.skills.forEach(async skillId => {
                await db.TasksSkills.create({
                    taskId: savedTask.id,
                    skillId: skillId
                });
            });
            const newTask = await getById(savedTask.id);
            resolve(newTask);
        }   
        catch(err) {
            console.log(err);
            reject(err);
        }
    });
}

// Determines if an agent has all skills required for a task.
const agentHasAllSkills = function(agent, taskSkills) {
    let hasSkills = true;
    for (let i = 0; i < taskSkills.length; i++) {
        if (!agent.skills.some(x => x.id === taskSkills[i])) {
            hasSkills = false; break;
        }
    }
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
    getById: getById,
    create: create
}