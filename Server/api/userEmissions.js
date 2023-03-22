var express = require('express');
var router = express.Router(); //the router
var UserEmissions = require('../models/UserEmissions.js'); //requires what we need
router.get('/', async function(req, res, next) {
    const content = await UserEmissions.findAll(); //waits and then puts the data into content
    res.status(200).json({
      content
    });
  });
  
  module.exports = router;