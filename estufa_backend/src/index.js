const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

require('./startup/routes')(app);


const port = 8080; // local host : 8080 / cadastro

const server = app.listen(port, () => console.log(`Listening on port ${port}`)); //log = print

module.exports = server;

