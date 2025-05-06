const express = require('express');
const SensoresController = require('../controller/SensoresController');
const router = express.Router();

router
    .get('/valores/:id', SensoresController.getById)
    .get('/valores', SensoresController.getAllSensores)
    .get('/latest', SensoresController.getLatest)
    .get('/por-data', SensoresController.getByDate);

module.exports = router;