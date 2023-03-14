const express = require('express');
let router = express.Router();
let User = require('../models/User.js');

// put goal in user table in db
router.put('/', async function (req, res) {
  const goal = req.body.goal;

  await User.update({ goal: goal }, { where: { id: 1 } });

  res.send(200);
});

module.exports = router;