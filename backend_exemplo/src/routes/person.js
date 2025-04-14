const express = require('express');
const PersonController = require('../controller/PersonController');
const router = express.Router();
router
    .get('/pegar', PersonController.getAllPeople)
    .get('/pegar/:id', PersonController.getById)
    .post('/', PersonController.create)
    .patch('/atualizar/:id', PersonController.updateById)
    .delete('/deletar/:id', PersonController.deleteById)
// dois pontos ele vai receber um parametro
module.exports = router;