const { Sequelize } = require('sequelize');

const database = new Sequelize('Estufafa', 'Estufafa', '123456', {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433, 
  dialectOptions: {
    options: {
      encrypt: false,               
      trustServerCertificate: true,
    }
  }
});

module.exports = database;
