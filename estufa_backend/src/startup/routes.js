const express = require('express');
const person = require('../routes/person');

// localhosts:8080 / api/person
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/person', person);
}



