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
            return resolve(task);
        })
        .catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

// Creates a new Task and assigns to an Agent.
const create = function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            // Ensure the new task is valid.
            const result = await validateTask(task);
            if (result.errors.length == 0) {
                let newTask;
                // First check for agents without any tasks assigned.
                const tasklessAgents = await agentService.getTaskless();
                if (tasklessAgents.length > 0) {
                    newTask = await assignToTasklessAgent(tasklessAgents, task);
                    if (newTask)
                        return resolve(newTask);
                }
                // Next check to see if there are any agents with existing tasks who can handle.
                const agentsWithTasks = await agentService.getAllWithTasks();
                if (agentsWithTasks.length > 0) {
                    newTask = await assignToAgent(agentsWithTasks, task);
                    if (newTask)
                        return resolve(newTask);
                }
                // If no agents were found, throw an error.
                return reject({
                    status: 200,
                    message: 'Agents Unavailable',
                    error: noAgentsError
                });
            } else {
                return reject(result);
            }
        }
        catch(err) {
            console.log(err);
            return reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
            });
        }
    });
}

// Update a task to completed status.
const completeTask = function(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const task = await getById(id);
            if (task) {
                if (!task.completed) {
                    db.Task.update({ 
                        completed: true, 
                        completedOn: new Date() 
                    },
                    { where : { id: task.id }})
                    .then(() => {
                        return resolve(true);
                    });
                } else {
                    return reject({
                        status: 400,
                        message: 'Bad Request',
                        error: `Task with Id ${id} has already been marked as Complete.`
                    });
                }
            } else
                return reject({
                    status: 404,
                    message: 'Not Found',
                    error: `A Task with Id ${id} does not exist.`
                });
        } catch(err) {
            console.log(err);
            return reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
            });
        }
    });
}

// Attempt to assign a task to a capable agent. 
const assignToAgent = function(agents, task) {
    return new Promise(async (resolve, reject) => {
        try {
            let agentId;
            const capableAgents = [];
            agents.forEach(agent => {
                if (agentHasAllSkills(agent, task.skills)) 
                    capableAgents.push(agent);
            });
            // If the are agents capable of handling the task.
            if (capableAgents.length > 0) {
                for (let i = 0; i < capableAgents.length; i++) {
                    // If the agent's existing tasks do not equal the new task priority.
                    if (!capableAgents[i].tasks.some(x => x.priority === task.priority)) {
                        // Get the agent Id to assign.
                        agentId = capableAgents[i].id; break;
                    }
                }
                // If an agent was not found, Ensure that the task priority greater than low.
                if (!agentId && task.priority > 1) {
                    let prioritySum = 0;
                    const taskDetail = [];
                    // Check if all agents are working on a low priority task.
                    capableAgents.forEach(agent => {
                        agent.tasks.forEach(task => {
                            prioritySum += task.priority;
                            taskDetail.push({agentId: agent.id, assignedOn: task.assignedOn});
                        });
                    });
                    // If all agents have a task with priority 1.
                    if (prioritySum === capableAgents.length) {
                        // Get the agent with the most recent assigned task.
                        const lastAssigned = taskDetail.reduce((prev, current) =>
                            (prev.assignedOn > current.assignedOn) ? prev : current); 
                        agentid = lastAssigned.agentId;
                    }
                }
                // Assign the task to the selected agent.
                if (agentId) {
                    task.agentId = agentId;
                    const newTask = await assignNewTask(task);
                    return resolve(newTask);
                }
            }
            resolve(null);
        } catch(err) {
            console.log(err);
            return reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
        });
        }
    });
}

// Attempt to assign a task to a capable agent without any tasks.
const assignToTasklessAgent = function(agents, task) {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < agents.length; i++) {
                // If the agent has all of the skills required by the task.
                if (agentHasAllSkills(agents[i], task.skills)) {
                    task.agentId = agents[i].id;
                    // Assign the task to the agent.
                    const newTask = await assignNewTask(task);
                    return resolve(newTask);
                }
            }
            return resolve(null);
        } catch(err) {
            console.log(err);
            return reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
            });
        }
    });
}

// Assigns a new task to an agent.
const assignNewTask = function(task) {
    return new Promise(async (resolve, reject) => {
        try {
            task.assignedOn = new Date();
            task.completed = false;
            const savedTask = await db.Task.create(task);
            task.skills.forEach(async skillId => {
                await db.TasksSkills.create({
                    taskId: savedTask.id,
                    skillId: skillId
                });
            });
            const newTask = await getById(savedTask.id);
            return resolve(newTask);
        } catch(err) {
            console.log(err);
            return reject(err);
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
const validateTask = function(task) {
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
            return resolve(errorResponse);
        } catch(err) {
            console.log(err);
            return reject({
                status: 500,
                message: 'Server Error',
                error: 'An unexpected error occured. Please try again at a later time.'
            });
        }
    });
}

module.exports = {
    getById: getById,
    create: create,
    completeTask: completeTask
}