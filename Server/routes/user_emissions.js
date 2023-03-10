var express = require('express');
var router = express.Router();
var user_emissions = require('../models/user_emissions')
var users = require('../models/users')
const {SustainabilityMap, SUSTAINABILITY_POSITIVE_SCORE} = require('../utils/SustainabilityScore')


async function UpdateScore(ID) {

    //get total_emissions, the only valid one is today. and the next earliest one
    //the next earliest one comes into play when a goal is set
    let emission_entries = await user_emissions.findAll({
        limit : 2, 
        where : { 
            user_id : ID
        },
        order : [['date', 'DESC' ]]
    })

    //get the user entry in the user table
    let user = await users.findOne({
        where : {
            id : ID
        }
    });

    //get their projected score from the sustainability map 
    //if they are above a sustability of 7 we'll decrement by one
    //as to reward users for having a pretty good score
    if(projected_score >= 7) projected_score--; 
    let projected_score = SustainabilityMap[sus_score];


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
            goal_bonus = ((last_emissions-todays_emissions)/last_emissions)*100;
        }
    }

    //TODO : Bring up adding a streak of logins into the user db table  
    let login_bonus = 0.10;



    if(emissions[0] <= projected_score) {
        global_score += 500*(1+login_bonus+goal_bonus);
    }
    else {
        global_score -= 300*(1-login_bonus);    
        if(global_score < 0) global_score = 0;
    }

    //Todo : Make function logarithmic after reaching level 50/30 - Will ask team which one would be preferred 
    
    //put back in table 
    await user.update({global_score : globalScore}, 
        { where : { id : ID}}
    );

}



// module.exports = { UpdateLevel, getLevel, getSustainabilityScore }

router.put('/:id', async (req, res) =>{
    //whatever data entry team has to put for their entries
    UpdateLevel(id);
});

router.put('/:id', (req, res) =>{
    getLevel(id);
})

module.exports = router;