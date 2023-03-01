import { Sequelize } from "sequelize";

// Local host, once we have a real server do not include these on public github !!!!
const sequelize = new Sequelize('crbn', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;