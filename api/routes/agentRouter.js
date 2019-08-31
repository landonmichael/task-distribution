'use strict'

const express = require('express');
const agentCtrl = require('../controllers/agentController');
const router = express.Router();

router.route('')
    .get(agentCtrl.getAllWithTasks);

module.exports = router;