var express = require('express');
var router = express.Router();
var user_emissions_table = require('../models/user_emissions')
var user_table = require('../models/user')
const {SustainabilityMap, SUSTAINABILITY_POSITIVE_SCORE} = require('../utils/SustainabilityScore')


async function UpdateScore(ID) {

    //get total_emissions, the only valid one is today. and the next earliest one
    //the next earliest one comes into play when a goal is set
    let emission_entries = await user_emissions_table.findAll({
        limit : 2, 
        where : { 
            user_id : ID
        },
        order : [['date', 'DESC' ]]
    })

    //get the user entry in the user table
    let user = await user_table.findOne({
        where : {
            id : ID
        }
    });


    //get their projected score from the sustainability map 
    //if they are above a sustability of 7 we'll decrement by one
    //as to reward users for having a pretty good score
    let projected_score = SustainabilityMap[emission_entries[0].sustainability_score];
    if(projected_score >= 7) projected_score--; 



    //shorthand
    let sus_score = user.sustainability_score;
    let globalScore = user.globalScore;
    let goal = user.goal;
    let goal_bonus = 0;



    //get their previous emmissions only if they have a goal, and they
    //have an emission in the db to count
    if(goal != null && emission_entries.length == 2) { 
        //get percent decrease
        let todays_emissions = entries[0].total_emissions;
        let last_emissions = entries[1].total_emissions; 

        if(todays_emissions < last_emissions ) { 
            goal_bonus = (((last_emissions-todays_emissions)/last_emissions)*100)%goal;
        }
    }



    //TODO : Bring up adding a streak of logins into the user db table  
    let login_bonus = 0.10;


    if(emissions[0] <= projected_score) {
        globalScore += 500*(1+login_bonus+goal_bonus);
    }
    else {
        globalScore -= 300*(1-login_bonus);    
        if(globalScore < 0) globalScore = 0;
    }

    //Todo : Make function logarithmic after reaching level 50/30 - Will ask team which one would be preferred 
    
    //put back in table 
    await user_table.update({global_score : globalScore}, 
        { where : { id : ID}}
    );

}



router.put('/:id', async function(req, res, next){
    //whatever data entry team has to put for their entries
    UpdateScore(req.params.id);
    return res.status(200).send("I did not crash :O");
});


module.exports = router;
