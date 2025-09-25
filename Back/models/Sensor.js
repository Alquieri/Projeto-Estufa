const { Sequelize } = require('sequelize');
const database = require("../config/db.js")

const Sensor = database.define("Sensor_tb", {

    Sensor_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Luz : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Temperatura : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Umidade : {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    

})

module.exports = Sensor;
