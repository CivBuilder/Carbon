const {SustainabilityMap, SUSTAINABILITY_POSITIVE_SCORE} = require('../utils/SustainabilityScore')  //I don't know why i have to back out the dir and go back in? AQ 
var user_emissions_table = require('../models/user_emissions.js')
var user_table = require('../models/user.js')


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
    let sus_score = user.sustainability_score
    if(sus_score >= SUSTAINABILITY_POSITIVE_SCORE) sus_score--;
    if(sus_score > 10) sus_score = 9;       //only here for wacky sustainability scores
    let projected_emissions = SustainabilityMap[sus_score];



    //shorthand
    let globalScore = user.global_score;
    console.log(globalScore)
    let goal = user.goal;
    let goal_bonus = 0;



    //get their previous emmissions only if they have a goal, and they
    //have an emission in the db to count
    if(goal != null && emission_entries.length == 2) { 
        //get percent decrease
        let todays_emissions = emission_entries[0].total_emissions;
        let last_emissions = emission_entries[1].total_emissions; 

        //get the goal_bonus, if they lowered by a percentage greater than their goal, just 
        //set the goal bonus to be the percentage of their goal
        //i.e Goal 25%, 29% decrease gets a 25% bonus 
        if(todays_emissions < last_emissions ) { 
            goal_bonus = (((last_emissions-todays_emissions)/last_emissions));
            if(goal_bonus > goal/100) goal_bonus = goal/100;
        }
    }



    //TODO : Bring up adding a streak of logins into the user db table  
    let login_bonus = 0.10;


    if(emission_entries[0].total_emissions <= projected_emissions) {
        console.log(globalScore)
        console.log("login_bonus: " + login_bonus);
        console.log("goal_bonus: " + goal_bonus);
        console.log("increase: " + 500*(1+login_bonus+goal_bonus));
        console.log("login_bonus: " + login_bonus);

        globalScore += 500*(1+login_bonus+goal_bonus);
    }
    else {
        globalScore -= 300*(1-login_bonus);    
        if(globalScore < 0) globalScore = 0;
    }

    //Todo : Make function logarithmic after reaching level 50/30 - Will ask team which one would be preferred 
    
    //put back in table 
    console.log(globalScore)

    await user_table.update(
        {global_score : globalScore}, 
        { where : { id : ID}}
    );

}

module.exports = UpdateScore