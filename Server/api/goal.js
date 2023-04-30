const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User.js');

// Sets a goal for the user to cut their current emissions by
router.put('/setGoal', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let { goal } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({ goal });
    res.status(200).json({
      'content': 'Goal updated'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
  Retrieves a user's total emissions for the previous month for goal setting.
**/
router.post('/getGoal', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const userId = req.user.id;

  // Find data based on user_id and given month
  const data = await User.findOne({
    where: {
      id: userId
    },
    attributes: ['goal'] // Only select the goal column
  });

  console.log('data :>> ', data);

  // means this is a new user, show 0 pounds of CO2
  if (data.length === 0 || data === null) {
    const data = { goal: 0 };  // create a new object to store the goal
    return res.status(200).json(data);
  }

  return res.status(200).json(data);
});


module.exports = router;