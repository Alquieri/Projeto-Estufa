const { Sequelize } = require('sequelize');
const database = require("../config/db.js")

const Acionadores = database.define("Acionadores_tb", {

    Acionadores_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Bomba : {
        type: Sequelize.BO,
        allowNull: false,
    },
    Irrigacao : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Valvula : {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    

})

module.exports = Acionadores;
