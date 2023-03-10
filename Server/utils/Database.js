const Sequelize = require('sequelize');

// Local host, once we have a real server do not include these on public github !!!!
const sequelize = new Sequelize('crbn', 'carbonDev', 'carbonRules123!', {
    host: 'carbondb-rds.caxzpxqes9ki.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});

module.exports = sequelize;