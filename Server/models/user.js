const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');

const user = sequelize.define('user', {
    //Columns 
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true, 
        allowNull : false,
        unique : true,
        autoIncrement : true,
    }, 
    username : { 
        type : DataTypes.STRING,
        allowNull : false, 
        unique : true
    }, 
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    sustainability_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false
    },
    goal : {
        type : DataTypes.DECIMAL(3,0).UNSIGNED,
        allowNull : true,
    },
    last_login : {
        type : DataTypes.DATE,
        allowNull : true,       //Should only be true when the user is first created
    },
}, {
    tableName : "user",
    freezeTableName : true,
})


module.exports = user;