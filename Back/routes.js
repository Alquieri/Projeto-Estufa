const express = require('express')
const routes = express.Router()


const Acionadores = require('./controllers/AcionadoresController.js')
routes.put('/Acionadores',Acionadores.updateAcionador)
routes.get('/acionadores/get',Acionadores.getAcionadores)

module.exports = routes
