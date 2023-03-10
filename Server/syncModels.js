const sequelize = require("./utils/Database.js");

const QuizContent = require('./models/QuizContent.js');
const QuizModel = require('./models/QuizModel');
const QuestionModel = require('./models/QuestionModel');
const AnswerModel = require('./models/AnswerModel');


//this will sync your sequelize models provided above to your database

//this comment removes the current table and then re-generates the table 
//sequelize.sync({force: true}).then(result => {
sequelize.sync().then(result => {
    //next line creates table entry 
    //return QuizContent.create({title: "quiz 1", category: "water", num: "1", question: "How many gallons of water does 1lb of beef need?", ans0: "1,799 gallons", ans1: "1,245 gallons", ans2: "125 gallons", ans3: "50 gallons"})
    //return QuizModel.create({quizname:"quiz 1", id: "1"})
    //return QuestionModel.create({quesid: "1", question: "1. Is this the first question?"})
    return AnswerModel.create({ansid: "1", answer: "Yes", iscorrect: "true"})
    console.log(result);
}).then(quizcontent => {
    console.log("Created: ", quizcontent);
}).catch(err => {
    console.log(err);
});
