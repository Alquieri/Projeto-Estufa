const express = require('express');
const SensoresController = require('../controller/SensoresController');
const router = express.Router();

router
    .get('/valores/:id', SensoresController.getById)
    .get('/valores', SensoresController.getAllSensores)
    

module.exports = router;