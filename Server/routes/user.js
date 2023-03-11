var express = require('express');
var router = express.Router();
var user_table = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Sample Response - This should never appear outside of testing');
});

router.get('/:id', async function(req, res, next) {
    console.log('ayo ,:_)')
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send('404 : user with ${ID} not found');
    }
    res.status(200).json({
        user_entry  //get 
    });
});


module.exports = router;
