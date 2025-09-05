// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('bugtracker', 'root', '11001100', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;

