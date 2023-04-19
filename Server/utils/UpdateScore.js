//Angel Quintanilla
const {SustainabilityMap, SUSTAINABILITY_POSITIVE_SCORE} = require('./SustainabilityScore')  
var user_emissions_table = require('../models/UserEmissions.js')
var user_table = require('../models/User.js')


//Prevent overflow in MySQL DB 
const MAX_SCORE = 100_000_000

/**
 * 
 * @param {Number} ID  
 * @returns - No value returned, instead will update database based on recorded emissions 
 */
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

    //Return if we have no entries ~ Shouldn't happen as we await for an async entry
    if(emission_entries.length === 0) return;


    //get their projected score from the sustainability map 
    //if they are above a sustability of 7 we'll decrement by one
    //as to reward users for having a pretty good score
    let sus_score = user.sustainability_score
    if(sus_score >= SUSTAINABILITY_POSITIVE_SCORE) sus_score--;
    if(sus_score > 10) sus_score = 9;       //only here for wacky sustainability scores
    let projected_emissions = SustainabilityMap[sus_score];



    //shorthand
    let goal_bonus = calculateGoalBonus(user.goal);
    let score_offset = 0; 
    let login_bonus = 0.10; 
    let newScores = [user.global_score, user.transport_score, user.lifestyle_score, user.diet_score, user.home_score];
    console.log("\n\nOld Scores:\n");
    console.log(newScores);
    let individualEmissions = 
        [
            emission_entries[0].total_emissions, emission_entries[0].transport_emissions, 
            emission_entries[0].lifestyle_emissions, emission_entries[0].diet_emissions, 
            emission_entries[0].home_emissions    
        ]


    //Check if youre track for your yearly carbon emissions
    if(emission_entries[0].total_emissions*365 <= projected_emissions) {
        score_offset = 500*(1+login_bonus+goal_bonus);
    }
    else {
        score_offset -= 300*(1-login_bonus);    
    }

    //Let each emission 
    for(let i = 0; i < newScores.length; i++) {
        if(i == 0) {
            newScores[i]+=score_offset;
        }
        else{
            newScores[i]+=score_offset*(1-(individualEmissions[i]/individualEmissions[0]));
        }
    
        if(newScores[i] < 0) newScores[i] = 0;
        if(newScores[i] > MAX_SCORE) newScores[i] = MAX_SCORE;
    }
    
    console.log("Individual Emissions:\n");
    console.log(individualEmissions);
    console.log("\n\nNew Scores");
    console.log(newScores)

    await user_table.update(
        {
            global_score : newScores[0],
            transport_score : newScores[1],
            lifestyle_score: newScores[2],
            diet_score : newScores[3], 
            home_score : newScores[4] 
        },
        { where : { id : ID}}
    );

}




/**
 * 
 * @param {Number} goal - goal set by user - Can be null
 * @param {Array} emission_entries - a collection of at max, the two previous emission entries
 * @returns - Goal bonus, which checks to see if a user has a goal, will return the percentage 
 *            of the goal met]
 */
function calculateGoalBonus(goal, emission_entries) {
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

    return goal_bonus;

}
module.exports = UpdateScore