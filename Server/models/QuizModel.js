const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const QuizModel = sequelize.define('quizmodel', {
    quizname : {
        type: Sequelize.STRING,
        allowNull:false,
    },
    id : {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
},{
    freezeTableName: true,
}
);

module.exports = QuizModel;

