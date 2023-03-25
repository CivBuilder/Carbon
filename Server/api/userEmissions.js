var express = require('express');
var router = express.Router(); //the router
var user_emissions_table = require('../models/UserEmissions.js'); //requires what we need
var user_table = require('../models/UserModel.js')
const UpdateScore = require('../utils/UpdateScore.js')

router.get('/', async function(req, res, next) {
    const content = await user_emissions_table.findAll(); //waits and then puts the data into content
    res.status(200).json({
      content
    });
  });
  


/* Finds all Entries where a user posted a submission*/
router.get('/:id', async function(req, res, next) {
    const user_entry = await user_emissions_table.findAll({
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



/* Post the Entry into the user table - Section is left blank for Data Entry to input whichever algorithm marks their recordkeeping*/
/* Subsequent Function Call to UpdateScore is dependant on there being at least one entry from the post request, hence it being at the end */
router.post('/:id', async function(req, res, next){
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. Submissions cannot be made for user's not in the database.");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }

    //whatever data entry team has to put for their entries

    await UpdateScore(req.params.id);
    return res.status(200).send("Data Successfully posted to Database.");
});


module.exports = router;
