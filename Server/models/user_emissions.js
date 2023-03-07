const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../utils/Database.js');

const user_emissions = sequelize.define('forumcontent' , { 
    //Columns
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        allowNull : false, 
        autoIncrement : true,
    }, 
    user_id : { 
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false, 
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
    recycling_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },
    food_emissions : {
        type : DataTypes.FLOAT, 
        allowNull : false, 
    },

},{

    tableName : 'user_emissions',
    freezeTableName : true, 
});

module.exports = user_emissions;