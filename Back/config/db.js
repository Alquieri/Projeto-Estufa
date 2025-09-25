const { Sequelize } = require('sequelize');

const database = new Sequelize('<DATABASE_NAME>', '<LOGIN>', '<PASSWORD>', {
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
