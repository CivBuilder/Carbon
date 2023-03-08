const Sequelize = require("sequelize")

const sequelize = require('../utils/Database.js');

const QuizContent = sequelize.define('quizcontent', {
    //title of the quiz
    title: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    //question category (recycling, water, etc.)
    category: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    //question number (per title 1,2,3,x)
    num: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    //question string
    question: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    // first answer (0 should be correct answer maybe? then rand 0-3 for order?)
    ans0: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    //second answer
    ans1: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    //third answer
    ans2: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    //fourth answer
    ans3: {
        type: Sequelize.STRING,
        allowNull:false,
    },
},{
    freezeTableName: true,
}
);

module.exports = QuizContent;