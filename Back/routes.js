const express = require('express')
const routes = express.Router()


const Sensor = require('./controllers/SensorController.js')
routes.post('/sensor',Sensor.PostSensor)
routes.get('/get/sensor/data/:date',Sensor.GetSensorByDate)
routes.get('/get/sensor', Sensor.GetLastPost)

module.exports = routes
