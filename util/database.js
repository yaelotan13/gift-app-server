const Sequelize = require('sequelize');

const sequelize = new Sequelize('gifts', 'root', 'yaelotan2020Mysql', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
