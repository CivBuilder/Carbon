const express = require('express');
const router = express.Router();
const User = require('../models/UserModel.js');

// put goal in user table in db
router.put('/', async (req, res) => {
  let { goal } = req.body;
  const userId = req.query.user_id;

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

module.exports = router;