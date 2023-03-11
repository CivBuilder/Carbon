const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');

const user_emissions = sequelize.define('user_emissions' , { 
    //Columns
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        allowNull : false, 
        autoIncrement : true,
        unique : true, 
    }, 
    user_id : { 
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
        references : {
            model : 'user',
            key : 'id'
        }
    },
    date : {
        type : DataTypes.DATE,
        allowNull : false, 
    },
    total_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },
    transport_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },
    lifestyle_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },
    food_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },
    home_emissions : {
        type : DataTypes.FLOAT,
        allowNull : false, 
    }

},{

    tableName : 'user_emissions',
    freezeTableName : true, 
    timestamps : false,
});

module.exports = user_emissions;