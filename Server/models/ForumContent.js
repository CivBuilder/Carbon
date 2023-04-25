const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');

const ForumContent = sequelize.define('forumcontent', {
    // Column Definitions
    id_forumcontent: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
}, {
    // Optional model properties
    tableName: 'forumcontent',

    // For some reason the default behaviour is to add an 's' to table name?????? this turns that off :)
    freezeTableName: true,
});

module.exports = ForumContent;