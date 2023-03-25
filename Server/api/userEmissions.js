var express = require('express');
var router = express.Router(); //the router
var user_emissions_table = require('../models/UserEmissions.js'); //requires what we need
var user_table = require('../models/UserModel.js');
const UpdateScore = require('../utils/UpdateScore.js');
const sequelize = require('../utils/Database.js');


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



/* Post the Entry into the user table - Section is left blank for Data Entry to input whichever algorithm marks their recordkeeping
   Subsequent Function Call to UpdateScore is dependant on there being at least one entry from the post request, hence it being at the end 

   Expected JSON Body : 
   {
        transport_emissions : Number, 
        total_emissions : Number,
        lifestyle_emissions : Number, 
        food_emissions : Number, 
        home_emissions : Number
   }

   Each Number is to be lbs of CO2 from the day. 
*/
router.post('/:id', async function(req, res, next){
    //Verify User exists
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. Submissions cannot be made for user's not in the database.");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }

    //Check if the necessary entries exist
    if( 
        typeof req.body.transport_emissions != "number" ||
        typeof req.body.total_emissions != "number" ||
        typeof req.body.lifestyle_emissions != "number" ||
        typeof req.body.food_emissions != "number" ||
        typeof req.body.home_emissions != "number" 
    ) 
    { 
        return res.status(400).send(`400 : bad request. Body Does Not Contain Required Entries`);
    }

    for(const n of Object.values(req.body)) { 
        if(n < 0) return res.status(400).send(`400 : bad request. No Negative Emissions`);
    }

    const today = new Date().toISOString().slice(0, 10);

    await user_emissions_table.create({
        user_id : req.params.id,                                 //Needs to change with sessions states
        date : sequelize.fn('STR_TO_DATE',today, '%Y-%m-%d'),
        total_emissions : req.body.total_emissions,
        transport_emissions : req.body.transport_emissions,
        lifestyle_emissions : req.body.lifestyle_emissions,
        food_emissions : req.body.food_emissions,
        home_emissions : req.body.home_emissions
    });


    await UpdateScore(req.params.id);
    return res.status(200).send("Data Successfully posted to Database.");
});


module.exports = router;
