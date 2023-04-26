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
router.get('/leaderboard/:page', async function (req, res, next) {
    //get 50 users based on the page of entries we're retrieving from the DB
    const PAGE_SIZE = 15;
    const OFFSET = req.params.page * PAGE_SIZE;

    //Error checking if the page is out of bounds
    if (req.params.page < 0 || req.params.page > 100_000) {
        return res.status(400).send("Bad Request : Page out of bounds");
    }

    //get the leaderboard for this page.
    const leaderboard = await user_table.findAll({
        order: [['global_score', 'DESC'], ['id', 'ASC']],
        offset: OFFSET,
        attributes: [
            'username',
            'global_score',
            'sustainability_score'
        ],
        limit: PAGE_SIZE
    });

    //Nothing in this page, return 'No Content'
    if (leaderboard.length == 0) return res.status(204).json([])

    let prevScore = null;
    let prevRank = null;
    leaderboard.forEach((user, i, leaderboard) => {
        if (user.global_score !== prevScore) {
            user.dataValues.rank = OFFSET + i + 1;
            prevRank = user.rank;
        }
        else user.dataValues.rank = prevRank;
        prevScore = user.global_score;
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

router.put('/questionnaire/:id', async function (req, res, next) {
    const user_entry = await user_table.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user_entry) {
        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
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
        { where: { id: req.params.id } }
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
            [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.global_score > user.global_score) + 1'), 'ranking'],
            'sustainability_score',
            'avatar_index',
            'global_score',
        ],
        
    });

    if(!userScores) {

        console.log("Sending error code 404. No match found");
        return res.status(404).send(`404 : user with ${req.params.id} not found`);
    }
    
    //Get the score of the score of the user who is one rank above you
    users = await user_table.findAll({
        where : {
            global_score : { 
                [Op.gt] : userScores.dataValues.global_score,
            }
        },
        order : [['global_score', 'ASC']]
    })

    if(users.length == 0) {
        userScores.dataValues.nextRankScore = userScores.dataValues.global_score;
    }
    else {
        userScores.dataValues.nextRankScore = users[0].dataValues.global_score;
    }

    res.status(200).json(userScores)
})

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
    async (req, res, next) => {
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
