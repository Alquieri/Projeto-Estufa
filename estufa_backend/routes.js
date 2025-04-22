const bodyParser = require('body-parser');
const vehicle = require('./routes/vehicle');
const person = require('./routes/person');
const sensores = require('./routes/sensores');
const acionadores = require('./routes/acionadores');


module.exports = (app) => {
    app.use(
        bodyParser.json(),
    vehicle,
    person,
    sensores,
    acionadores,
    auth
)
}