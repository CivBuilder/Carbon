var express = require('express');
var passport = require('passport');
var router = express.Router();
var user_table = require('../models/User.js');
const sequelize = require('../utils/Database.js');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    console.log(req.user.email);
    var val = await user_table.findOne({
        where: {
            email: req.user.email
        }
    });


    // Simplest way to return everything without returning the password hash
    delete val.dataValues.password;

    return res.status(200).json(val);
})

/* Get Leaderboard - 10 above and 10 below */
router.get('/leaderboard', async function (req, res, next) {
    //get 50 users based on the page of entries we're retrieving from the DB
    const {page, category, worst} = req.query;
    console.log(page, category, worst);
    const PAGE_SIZE = 15;
    const OFFSET = page * PAGE_SIZE;

    
    //Error checking if the page is out of bounds
    if (page < 0 || page > 100_000) {
        return res.status(400).send("Bad Request : Page out of bounds");
    }

    //get the leaderboard for this page.
    const ordering = (worst === "true")? 'ASC' : 'DESC';

    const leaderboard = await user_table.findAll({
        order: [[category, ordering ], ['id', 'ASC']],
        offset: OFFSET,
        attributes: [
            'username',
            category,
            'avatar_index'
        ],
        limit: PAGE_SIZE
    });

    //Nothing in this page, return 'No Content'
    if (leaderboard.length == 0) return res.status(204).json([])


    leaderboard.forEach((user, i, leaderboard) => {
        user.dataValues.rank =  OFFSET + i + 1;
    });
    res.status(200).json(leaderboard);
})




/*
Put User Questionnaire Results
    Expected Json Body:
    {
        transport_score   : int (these are percentages from 0 - 100)
        lifestyle_score   : int
        food_score        : int
        home_score        : int
        awareness_score   : int
    }
}

    Each category will have a 20% weight on their overall expected carbon emissions, which will be converted into a total
    column in the DB just labelled sustainability_score (1-10)

*/

router.put('/questionnaire', passport.authenticate('jwt', {session: false}), async function (req, res, next) {
    const user_entry = await user_table.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    console.log(typeof req.body.transport_score, typeof req.body.lifestyle_score, typeof req.body.food_score);
    //Make sure body has a percentage for their score that was correct
    if (
        typeof req.body.transport_score != "number" ||
        typeof req.body.lifestyle_score != "number" ||
        typeof req.body.food_score != "number" ||
        typeof req.body.home_score != "number" ||
        typeof req.body.awareness_score != "number"
    ) {
        return res.status(400).send(`400 : bad request. Body does not contain a defined percentage for one of the required entries.` +
            "Required Entries : transport_scorem lifestyle_score, food_score,home_score, awareness_score,");
    }


    //check to make sure the range for all values are between 0 and 100.
    sustainability_score_input = 0;
    for (const n of Object.values(req.body)) {
        if (n < 0 || n > 100) return res.status(400).send(`400 : bad request. Percentage of ${n}% is not in a valid range.`);
        sustainability_score_input += n;
    }

    sustainability_score_input *= 0.02; //all the scores have a weight of 20%. This is the same effect as applying them individually
    sustainability_score_input = Math.floor(sustainability_score_input);



    await user_table.update(
        { sustainability_score: sustainability_score_input },
        { where: { id: req.user.id } }
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
router.post('/quiz', passport.authenticate('jwt', { session: false }), async function (req, res) {
    // //Just refactor this to a helper function
    const user_entry = await user_table.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.user.id} not found`);
    }
    //Make sure body has a percentage for their score that was correct
    if ((typeof req.body.score) != "number") {
        return res.status(400).send(`400 : bad request. Body does not contain a defined percentage for the score of the quiz.`);
    }
    else if (req.body.score < 0 || req.body.score > 100) {
        return res.status(400).send(`400 : bad request. Percentage is not in a valid range.`)
    }

    //increase score based on the percentage of the questions right
    await user_table.update(
        { global_score: user_entry.global_score + (req.body.score) },
        { where: { id: req.params.id } }
    );

    return res.sendStatus(200);

})


// Example of getting rank instead using JWT in the GET requests header
// By passing in passport.authenticate('jwt"...) as the second arg we are able to reference req.user

router.get('/rank', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
    
    const userScores = await user_table.findOne({
        where : {
            id : req.user.id

        },
        attributes: [
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.global_score > user.global_score) + 1'), 'global_ranking'],
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.transport_score > user.transport_score) + 1'), 'transport_ranking'],
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.lifestyle_score > user.lifestyle_score) + 1'), 'lifestyle_ranking'],
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.diet_score > user.diet_score) + 1'), 'diet_ranking'],
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.home_score > user.home_score) + 1'), 'home_ranking'],
            'sustainability_score',
            'avatar_index',
            'global_score',
            "transport_score", 
            "lifestyle_score", 
            "diet_score",  
            "home_score",
            "username"
        ],
        
    });
    // console.log(JSON.stringify(userScores, null, 4));

    if(!userScores) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    
    const scoreCategories = ['global_score',"transport_score", "lifestyle_score", "diet_score", "home_score",]
    // for(var str of scoreCategories){
    //     await getNextRankScores(str, userScores)
    // }
    const rank_categories = ['global_ranking',"transport_ranking", "lifestyle_ranking", "diet_ranking", "home_ranking",]
    // for(var str of rank_categories){
    //     await updateRank(str, userScores, req.user.id);
    // }

    for( let i = 0; i < scoreCategories.length; i++){
        await getNextRankScores(scoreCategories[i], userScores);
        await updateRank(scoreCategories[i], userScores, req.user.id, rank_categories[i]);
    }

    res.status(200).json(userScores)
})

/**
 * getNextRankScores - Ranking Function for all user scores categories, used in conjunction with
 * @function router.get('/rank')
 * @param {String} categoryName - Name of category to fetch from the DB 
 * @param {Object} userScores - Name of the returning package to send back to user
 */
async function getNextRankScores(categoryName, userScores){
    //Get the score of the score of the user who is one rank above you
    const users = await user_table.findAll({
        where : {
            [categoryName] : { 
                [Op.gt] : userScores.dataValues[categoryName],
            }
        },
        order : [[categoryName, 'ASC']]
    })

    if(users.length == 0) {
        userScores.dataValues["next_rank_"+categoryName] = userScores.dataValues[categoryName];
    }
    else {
        userScores.dataValues["next_rank_"+categoryName] = users[0].dataValues[categoryName];
    }
    return userScores
}

async function updateRank(categoryName, userScores, id, rankName) {
    // get all users with matching score
    const otherUsers = await user_table.findAll({
        where : {
            [categoryName] :{ 
                [Op.eq] : userScores.dataValues[categoryName] 
            }
        }, 
        order : [['id' , 'ASC']]
    });

    console.log(userScores.dataValues)

    // get users with matching id
    // count how many users have an id less than the userScores.id
    // how ever many users are below us, add that to our score
    if (otherUsers.length) {
        const filteredUsers = otherUsers.filter(user => user.id < id);
        userScores.dataValues[rankName] += filteredUsers.length;
    }

}








// UPDATE USER SETTINGS
router.put('/changeUsername', passport.authenticate('jwt', { session: false }), async function (req, res) {
    // check if the username already exists in the DB
    let { username } = req.body;
    const user = await user_table.findOne({
        where: {
            username: username
        }
    });

    // below line is equivalent to user ? true : false
    const usernameExists = !!user;

    // if username not already in use, change it
    if (!usernameExists) {
        const userId = req.user.id;

        try {
            const user = await user_table.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update({ username });
            res.status(200).json({
                'content': 'Username updated'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(500).json({ error: 'Username already use.' });
    }
});

router.put('/changePassword', passport.authenticate('jwt', { session: false }), async function (req, res) {
    let { newPassword, oldPassword } = req.body;
    const userId = req.user.id;

    const user = await user_table.findOne({
        where: {
            id: userId,
        }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const passwordChecker = await bcrypt.compare(oldPassword, user.password);

    // below line is equivalent to user ? true : false
    const correctPassword = !!passwordChecker;

    if (correctPassword) {
        try {
            const salt = await bcrypt.genSaltSync(10, 'a');
            const saltedPassword = bcrypt.hashSync(newPassword, 10);

            await user.update({ password: saltedPassword });
            res.status(200).json({
                'content': 'Password updated'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
    else {
        res.status(500).json({ error: `Password doesn't match our records.` });
    }
});

router.put('/changePFP', passport.authenticate('jwt', { session: false }), async function (req, res) {
    console.log(req.user);
    const user = await user_table.findOne({ where: { id: req.user.id } });
    user.profile_selection = req.body.profile_selection;
    await user.save();
    return res.sendStatus(200);
});

router.get('/check-questionnaire/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    const user_entry = await user_table.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404: user with ${req.params.id} not found`);
    }
    const finished_questionnaire = user_entry.finished_questionnaire;
    const result = finished_questionnaire ? true : false;
    res.status(200).json(result);
});

router.post('/finish-questionnaire/', passport.authenticate('jwt', { session: false }), async function(req, res) {
    const user_entry = await user_table.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404: user with ${req.params.id} not found`);
    }
    await user_entry.update({
        finished_questionnaire: true
    });
    res.status(200).send('Questionnaire finished');
});

// AUTHENTICATION

router.post(
    '/auth/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/auth/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { id: user.id, email: user.email };
                            console.log(body);
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    });

module.exports = router;
