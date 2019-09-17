'use strict'

const agentsWithTasks = [
    {
        id: 'abd8e1ff-3246-4dd5-a6bb-e56ee70c0ae5',
        name: 'Agent1',
        tasks: [
            {
                id: 'c195e0cb-8247-4958-81eb-1e22ec72bd5d',
                name: 'Task1',
                priority: 2,
                assignedOn: new Date(),
                completed: 0,
                skills: [
                    {
                        id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                        name: 'Skill1'
                    }
                ]
            }
        ],
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    },
    {
        id: 'cf103eeb-ee82-49ec-b88d-93d8483bf45b',
        name: 'Agent2',
        tasks: [
            {
                id: 'fad104e9-80be-4ae6-b13b-4e0c58a52579',
                name: 'Task2',
                priority: 1,
                assignedOn: new Date(),
                completed: 0,
                skills: [
                    {
                        id: '1fbb2e22-9962-44af-8022-cd7981acf998',
                        name: 'Skill2'
                    },
                    {
                        id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                        name: 'Skill3'
                    }
                ]
            }
        ],
        skills: [
            {
                id: '1fbb2e22-9962-44af-8022-cd7981acf998',
                name: 'Skill2'
            },
            {
                id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                name: 'Skill3'
            }
        ]
    }
];

const agentsWithAllLowPriorityTasks = [
    {
        id: 'abd8e1ff-3246-4dd5-a6bb-e56ee70c0ae5',
        name: 'Agent1',
        tasks: [
            {
                id: 'c195e0cb-8247-4958-81eb-1e22ec72bd5d',
                name: 'Task1',
                priority: 2,
                assignedOn: new Date('2019-09-01T10:00:00Z'),
                completed: 0,
                skills: [
                    {
                        id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                        name: 'Skill1'
                    }
                ]
            }
        ],
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    },
    {
        id: 'cf103eeb-ee82-49ec-b88d-93d8483bf45b',
        name: 'Agent2',
        tasks: [
            {
                id: 'fad104e9-80be-4ae6-b13b-4e0c58a52579',
                name: 'Task2',
                priority: 2,
                assignedOn: new Date('2019-09-01T12:00:00Z'),
                completed: 0,
                skills: [
                    {
                        id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                        name: 'Skill1'
                    }
                ]
            }
        ],
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    },
    {
        id: '248cffab-9a80-49ad-a173-b98e0213bec8',
        name: 'Agent3',
        tasks: [
            {
                id: 'fad104e9-80be-4ae6-b13b-4e0c58a52579',
                name: 'Task3',
                priority: 2,
                assignedOn: new Date('2019-09-01T11:00:00Z'),
                completed: 0,
                skills: [
                    {
                        id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                        name: 'Skill1'
                    }
                ]
            }
        ],
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    }
];


const agentsWithoutTasks = [
    {
        id: 'c2bfad1e-1f83-4cb7-ba8e-1eec357eab25',
        name: 'Agent3',
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    },
    {
        id: 'e3924ad9-289d-4c98-acb6-d8b0c7041f90',
        name: 'Agent4',
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            },
            {
                id: '1fbb2e22-9962-44af-8022-cd7981acf998',
                name: 'Skill2'
            },
            {
                id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                name: 'Skill3'
            }
        ]
    }
];

const allAgents = agentsWithTasks.concat(this.agentsWithoutTasks);

const skills = [
    {
        id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
        name: 'Skill1'
    },
    {
        id: '1fbb2e22-9962-44af-8022-cd7981acf998',
        name: 'Skill2'
    },
    {
        id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
        name: 'Skill3'
    }
];

const tasks = [
    {
        id: 'c195e0cb-8247-4958-81eb-1e22ec72bd5d',
        name: 'Task1',
        assignedOn: new Date(),
        completed: 0,
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            }
        ]
    },
    {
        id: 'fad104e9-80be-4ae6-b13b-4e0c58a52579',
        name: 'Task2',
        assignedOn: new Date(),
        completed: 0,
        skills: [
            {
                id: '1fbb2e22-9962-44af-8022-cd7981acf998',
                name: 'Skill2'
            },
            {
                id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                name: 'Skill3'
            }
        ]
    },
    {
        id: '455a736d-ca8e-4544-ac16-9ad665aed351',
        name: 'Task3',
        assignedOn: new Date(),
        completed: 0,
        skills: [
            {
                id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
                name: 'Skill1'
            },
            {
                id: '1fbb2e22-9962-44af-8022-cd7981acf998',
                name: 'Skill2'
            },
            {
                id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                name: 'Skill3'
            }
        ]
    },
    {
        id: 'a0178f86-c76a-40ad-82f9-9276d2dd52e3',
        name: 'Task4',
        assignedOn: new Date(),
        completed: 1,
        skills: [
            {
                id: 'd5f6d726-721a-4b2e-9e74-112c59e68064',
                name: 'Skill3'
            }
        ]
    }
];

const validCreateLowPriorityTask = {
    name: 'Task5',
    priority: 1,
    skills: [
        'a71dc723-7867-442d-b9c3-52e43b13e945'
    ]
}

const validCreateHighPriorityTask = {
    name: 'Task6',
    priority: 2,
    skills: [
        '1fbb2e22-9962-44af-8022-cd7981acf998'
    ]
}

const newlyCreatedLowPriorityTask = {
    id: '803b2cd4-1fb7-4e5c-9689-a52106ded7e3',
    name: 'Task5',
    assignedOn: new Date(),
    priority: 1,
    agentId: 'c2bfad1e-1f83-4cb7-ba8e-1eec357eab25',
    completed: false,
    skills: [
        {
            id: 'a71dc723-7867-442d-b9c3-52e43b13e945',
            name: 'Skill1'
        }
    ]
}

const newlyCreatedHighPriorityTask = {
    id: 'e7461eaf-1c53-48ae-968f-ecb2c1d3ef4d',
    name: 'Task6',
    assignedOn: new Date(),
    priority: 2,
    agentId: 'cf103eeb-ee82-49ec-b88d-93d8483bf45b',
    completed: false,
    skills: [
        {
            id: '1fbb2e22-9962-44af-8022-cd7981acf998',
            name: 'Skill2'
        }
    ]
}

module.exports = {
    agentsWithTasks: agentsWithTasks,
    agentsWithAllLowPriorityTasks: agentsWithAllLowPriorityTasks,
    agentsWithoutTasks: agentsWithoutTasks,
    allAgents: allAgents,
    skills: skills,
    tasks: tasks,
    validCreateLowPriorityTask: validCreateLowPriorityTask,
    validCreateHighPriorityTask: validCreateHighPriorityTask,
    newlyCreatedLowPriorityTask: newlyCreatedLowPriorityTask,
    newlyCreatedHighPriorityTask: newlyCreatedHighPriorityTask
}