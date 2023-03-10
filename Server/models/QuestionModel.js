const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const QuestionModel = sequelize.define('questionmodel', {
    quesid : {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    question : {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
},{
    freezeTableName: true,
}
);

module.exports = QuestionModel;


