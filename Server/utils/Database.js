const Sequelize = require('sequelize');

// Local host, once we have a real server do not include these on public github !!!!
const sequelize = new Sequelize('carbon_test', 'carbonDev', 'carbonRules123!', {
    host: 'carbon-test.cnyblmtbcmm5.us-west-1.rds.amazonaws.com',
    dialect: 'mysql'
});

module.exports = sequelize;