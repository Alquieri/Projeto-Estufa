const Sensor = require('../models/Sensor.js')

module.exports = {

    async PostSensor(req,res)
    {
        res.status(200).json({ message: "Success!" });
    }
}
