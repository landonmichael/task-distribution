'use strict'

const db = require('../../models');

const getAll = function() {
    return new Promise((resolve, reject) => {
        db.Skill.findAll()
            .then(skills => {
                resolve(skills);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

module.exports = {
    getAll: getAll
}