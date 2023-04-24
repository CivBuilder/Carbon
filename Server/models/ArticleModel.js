const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const ArticleModel = sequelize.define('articlemodel', {
    articleid : {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },   
    articlelink : {
        type: Sequelize.STRING,
        allowNull:false,
    },
},{
    freezeTableName: true,
}
);

module.exports = ArticleModel;

