const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    //Columns 
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true, 
        allowNull : false,
        unique : true,
        autoIncrement : true,
    }, 
    username : { 
        type : DataTypes.STRING(45),
        allowNull : false, 
        unique : true
    }, 
    email : {
        type : DataTypes.STRING(45),
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING(45),
        allowNull : false
    },
    sustainability_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false
    },
    goal : {
        type : DataTypes.DECIMAL(3,0).UNSIGNED,
        allowNull : true,
        defaultValue : null
    },
    last_login : {
        type : DataTypes.DATE,
        allowNull : true,       //Should only be true when the user is first created
        defaultValue : null 
    },
    avatar_index : {
        type : DataTypes.TINYINT.UNSIGNED,
        allowNull : false, 
        defaultValue : 1
    },
    global_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    },
    transport_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    },
    lifestyle_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    },
    diet_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    },
    home_score : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    },
    profile_selection : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        defaultValue: 0 
    }
}, {
    hooks: {
        beforeCreate: async(user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, 10);
            }
        }
    },
    tableName : "user",
    freezeTableName : true,
    timestamps : false,
})


module.exports = User;