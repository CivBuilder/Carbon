var express = require('express');
var router = express.Router();
var QuizModel = require('../models/QuizModel.js');
var QuestionModel = require('../models/QuestionModel.js');
var AnswerModel = require('../models/AnswerModel.js');

// CRUD Model for forumContent

// POST

// GET 
router.get('/:id', async function(req, res, next) {

  // Find quiz given id
  const quiz = await QuizModel.findOne({
    where: {
      quizid: req.params.id
    }
  });
  if (!quiz) {
    console.log('not found');
    return res.status(404).send(`404 forumcontent with id ${req.params.id} was not found`);
  }

  // Find all questions associated with quizid
  const question = await QuestionModel.findAll({
    where: {
      quizid: req.params.id
    }
  });
  
  // Add the answer list to each of the questions
  for (const quest of question) {
    const answer = await AnswerModel.findAll({
      where: {
        quesid: quest.quesid
      }
    });

    quest.dataValues.answers = answer;
  };

  // Attach questions to quiz
  quiz.dataValues.questions = question;

  res.status(200).json({
    quiz
  });
});

// PUT

// DELETE


module.exports = router;
