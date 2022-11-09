const {Sequelize} = require('sequelize')
require("dotenv").config();

module.exports = new Sequelize(
    process.env.DB,
    'students_user',
    process.env.PASS,
    {
        dialect: 'postgres',
        host: process.env.HOST,
        port: 5432
    }
)
