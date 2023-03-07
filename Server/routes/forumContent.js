var express = require('express');
var router = express.Router();
var ForumContent = require('../models/ForumContent.js');

// Get all
router.get('/', async function(req, res, next) {
  const content = await ForumContent.findAll();
  res.status(200).json({
    content
  });
});

// CRUD Model for forumContent

// POST

// GET forum content by id.
router.get('/:id', async function(req, res, next) {
  const content = await ForumContent.findOne({
    where: {
      id_forumcontent : req.params.id
    }
  });
  if (!content) {
    console.log('not found');
    return res.status(404).send(`404 forumcontent with id ${req.params.id} was not found`);
  }
  res.status(200).json({
    content
  });
});

// PUT

// DELETE


module.exports = router;
