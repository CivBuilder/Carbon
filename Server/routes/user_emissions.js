var express = require('express');
var router = express.Router();
var user_emissions_table = require('../models/user_emissions.js')
var user_table = require('../models/user.js')
const UpdateScore = require('../utils/UpdateScore.js')
//GET - Sample response 
router.get('/', function(req, res, next) {
    res.send('Sample Response - This should never appear outside of testing');
  });


router.get('/:id', async function(req, res, next) {
    const user_entry = await user_emissions_table.findOne({
        where : {
            user_id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    res.status(200).json(user_entry);
});


router.post('/:id', async function(req, res, next){
    //whatever data entry team has to put for their entries
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. Submissions cannot be made for user's not in the database.");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    await UpdateScore(req.params.id);
    return res.status(200).send("Data Successfully posted to Database.");
});


module.exports = router;
