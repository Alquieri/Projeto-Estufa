const express = require('express');
const AcionadoresController = require('../controller/AcionadoresController');
const router = express.Router();

router
    .get('/valores', AcionadoresController.getAllAcionadores)
    .get('/valores/:id', AcionadoresController.getById)
    .put('/atualizar-valvulas/:id', AcionadoresController.updateValvulas)
    .put('/atualizar-irrigacao/:id', AcionadoresController.updateIrrigacao)
    .put('/atualizar-bomba/:id', AcionadoresController.updateBomba);
// dois pontos ele vai receber um parametro
module.exports = router;