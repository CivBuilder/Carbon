const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const AnswerModel = sequelize.define('answermodel', {
    ansid : {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    quesid : {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    answer : {
        type: Sequelize.STRING,
        allowNull:false,
    },
    iscorrect : {
        type: Sequelize.BOOLEAN,
        allowNull:false,
    },
},{
    freezeTableName: true,
}
);

module.exports = AnswerModel;

