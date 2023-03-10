const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const AnswerModel = sequelize.define('answermodel', {
    ansid : {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    answer : {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    iscorrect : {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        primaryKey:true,
    },
},{
    freezeTableName: true,
}
);

module.exports = AnswerModel;

