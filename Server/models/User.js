const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    sustainability_score: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    goal: {
        type: DataTypes.DECIMAL(3, 0),
        unsigned: true,
        defaultValue: null
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    global_score: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false, // Disable createdAt and updatedAt columns
    tableName: 'user'
});

module.exports = User;