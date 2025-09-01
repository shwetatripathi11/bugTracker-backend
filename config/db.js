const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bugtracker', 'root', '11001100', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
