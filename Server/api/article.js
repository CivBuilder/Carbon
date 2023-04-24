var express = require('express');
var router = express.Router();
var QuizModel = require('../models/ArticleModel.js');

// GET 
router.get('/:id', async function(req, res, next) {

  // Find article given id
  const article = await ArticleModel.findOne({
    where: {
      articleid: req.params.id
    }
  });

  res.status(200).json({
    article
  });
});


module.exports = router;
