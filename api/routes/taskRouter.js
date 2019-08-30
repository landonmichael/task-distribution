'use strict'

const express = require('express');
const taskCtrl = require('../controllers/taskController');
const router = express.Router();

router.route('')
    .post(taskCtrl.create);
router.route('/:taskId/complete')
    .put(taskCtrl.completeTask);

module.exports = router;