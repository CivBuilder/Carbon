const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const QuestionModel = sequelize.define('questionmodel', {
    quesid : {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    quizid : {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    question : {
        type: Sequelize.STRING,
        allowNull:false,
    },
},{
    freezeTableName: true,
}
);

module.exports = QuestionModel;


