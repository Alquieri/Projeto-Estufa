const express = require('express');
const PersonController = require('../controller/PersonController');
const router = express.Router();
router
    .get('/pegar', PersonController.getAllPeople)
    .get('/pegarID', PersonController.getById)
    .post('/cadastro', PersonController.create)
    .patch('/:id', PersonController.updateById)
    .delete('/:id', PersonController.deleteById)
module.exports = router;