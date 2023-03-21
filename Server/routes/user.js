var express = require('express');
var router = express.Router();
var user_table = require('../models/user.js');
const sequelize = require('../utils/Database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Sample Response - This should never appear outside of testing');
});

router.get('/:id', async function(req, res, next) {
    
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    res.status(200).json(user_entry);
});

/* GET User Rank */
router.get('/rank/:id', async function(req, res, next) {
    const rank = await user_table.findOne({
        where : {
            id : req.params.id
        },
        attributes : [
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.global_score > user.global_score) + 1'), 'ranking']
        ]
    });
    if(!rank) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    res.status(200).json(rank)
})


/* 
Put User Questionnaire Results 
    Expected Json Body:
    {
        transport_score   : int (these are percentages from 0 - 100)
        lifestyle_score   : int
        food_score  `     : int 
        home_score        : int
        awareness_score   : int
    }
}

    Each category will have a 20% weight on their overall expected carbon emissions, which will be converted into a total 
    column in the DB just labelled sustainability_score (1-10)

*/

router.put('/questionnaire/:id', async function(req, res, next) {
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    //Make sure body has a percentage for their score that was correct
    if( 
        typeof req.body.transport_score != "number" ||
        typeof req.body.lifestyle_score != "number" ||
        typeof req.body.food_score != "number" ||
        typeof req.body.home_score != "number" ||
        typeof req.body.awareness_score != "number" 
    ) 
    { 
        return res.status(400).send(`400 : bad request. Body does not contain a defined percentage for the score of the quiz.`);
    }


    //check to make sure the range for all values are between 0 and 100.
    sustainability_score_input = 0;
    for(const n of Object.values(req.body)) { 
        if(n < 0 || n > 100) return res.status(400).send(`400 : bad request. Percentage of ${n}% is not in a valid range.`);
        sustainability_score_input += n;
    }

    sustainability_score_input *= 0.02; //all the scores have a weight of 20%. This is the same effect as applying them individually
    sustainability_score_input = Math.floor(sustainability_score_input);


    await user_table.update(
        {sustainability_score : sustainability_score_input},
        {where : { id : req.params.id}}
    );


    res.sendStatus(200);
})

/* 
Put new Quiz result 
    Expected Json Body: 
    {
        "score" : number // this is to be a percentage of what the user got correct
    }
*/ 
router.post('/quiz/:id', async function(req, res, next) {
    // //Just refactor this to a helper function
    const user_entry = await user_table.findOne({
        where : {
            id : req.params.id
        }
    });
    if(!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    //Make sure body has a percentage for their score that was correct
    if( (typeof req.body.score) != "number") { 
        return res.status(400).send(`400 : bad request. Body does not contain a defined percentage for the score of the quiz.`);
    }
    else if (req.body.score < 0 || req.body.score > 100) {
        return res.status(400).send(`400 : bad request. Percentage is not in a valid range.`)
    }

    //increase score based on the percentage of the questions right
    await user_table.update(
        {global_score : user_entry.global_score+(req.body.score)}, 
        { where : { id : req.params.id}}
    );

    return res.sendStatus(200);

})

module.exports = router;
