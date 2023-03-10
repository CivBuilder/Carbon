const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const QuizModel = sequelize.define('quizmodel', {
    quizid : {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },   
    quizname : {
        type: Sequelize.STRING,
        allowNull:false,
    },
},{
    freezeTableName: true,
}
);

module.exports = QuizModel;

