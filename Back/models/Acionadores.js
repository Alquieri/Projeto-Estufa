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
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    Irrigacao : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    Valvula : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
    

})

module.exports = Acionadores;
