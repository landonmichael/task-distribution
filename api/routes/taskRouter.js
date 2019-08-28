'use strict'

const express = require('express');
const taskCtrl = require('../controllers/taskController');
const router = express.Router();

router.route('')
    .post(taskCtrl.create);
router.route('/:id')
    .put(taskCtrl.update);

module.exports = router;