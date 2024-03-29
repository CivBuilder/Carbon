var express = require('express');
const { INTEGER } = require('sequelize');
const { Op } = require("sequelize"); // This is used for the router that grabs user_id's data based on the current month
var router = express.Router(); //the router
var UserEmissions = require('../models/UserEmissions.js'); //requires what we need
var user_table = require('../models/User.js');
var passport = require('passport');
var sequelize = require('sequelize');
const User = require('../models/User.js');
const UpdateScore = require('../utils/UpdateScore.js')
const moment = require('moment');
/*********************
          GET
**********************/

router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
  // Use Moment.js to get today's date in the UTC timezone
  const moment = require('moment-timezone');
  const tz = 'America/Los_Angeles'; // Pacific Standard Time

  // Get the current date in the user's timezone
  const now = moment.tz(tz);

  // Get the start of the current day in the user's timezone
  const todaysDate = now.clone().startOf('day');

  const userId = req.user.id;
  //const userId = 323; //for testing
  //console.log("finding for this ID" + userId);
  const data = await UserEmissions.findAll({
    where: {
      user_id: userId,

    }
  });
  const content = data.filter(item => item.user_id == userId);
  // retArr = [[100, 200, 300, 400, 500], [500, 545, 100, 555, 100], [100, 200, 300, 400, 500], [800, 200, 750, 600, 500]]; //Temp array for data
  weekCount = 0;
  monthCount = 0;
  retArr = [[0, 0, 0, 0, 0], // TODAY
  [0, 0, 0, 0, 0], // YESTERDAY
  [0, 0, 0, 0, 0], // 7 DAYS (1 WEEK)
  [0, 0, 0, 0, 0]  // 31 DAYS (1 MONTH)
  ]; //Ret array
  for (const obj of content) {
    const value = obj.date;
    //grabbing all the necessary values for comapring dates
    checkMonth = value.substring(5, 7);
    checkDay = value.substring(8, 11);
    checkYear = value.substring(0, 4);
    //grabbing the emissions for the relevant data set
    const oldDate = moment([checkYear, checkMonth - 1, checkDay]).toDate();
    const difference_in_days = moment(todaysDate).diff(moment(oldDate), 'days');

    transport = obj.transport_emissions;
    diet = obj.diet_emissions;
    lifestyle = obj.lifestyle_emissions;
    home = obj.home_emissions;
    total = obj.total_emissions;

    if (difference_in_days == 0) {
      //Add to the daily array
      retArr[0][0] = transport;
      retArr[0][1] = diet;
      retArr[0][2] = lifestyle;
      retArr[0][3] = home;
      retArr[0][4] = total;
      //add to the weekly array and increment the count for that
      weekCount += 1;
      retArr[2][0] += transport;
      retArr[2][1] += diet;
      retArr[2][2] += lifestyle;
      retArr[2][3] += home;
      retArr[2][4] += total;
      //add to the montly array and increment the count for that
      monthCount += 1;
      retArr[3][0] += transport;
      retArr[3][1] += diet;
      retArr[3][2] += lifestyle;
      retArr[3][3] += home;
      retArr[3][4] += total;
      //   console.log(retArr);//for debugging
    }
    else if (difference_in_days == 1) {
      //Add to the yesterdays array
      retArr[1][0] = transport;
      retArr[1][1] = diet;
      retArr[1][2] = lifestyle;
      retArr[1][3] = home;
      retArr[1][4] = total;

      weekCount += 1;
      retArr[2][0] += transport;
      retArr[2][1] += diet;
      retArr[2][2] += lifestyle;
      retArr[2][3] += home;
      retArr[2][4] += total;
      //add to the montly array and increment the count for that
      monthCount += 1;
      retArr[3][0] += transport;
      retArr[3][1] += diet;
      retArr[3][2] += lifestyle;
      retArr[3][3] += home;
      retArr[3][4] += total;
      //   console.log(retArr);//for debugging
    }
    else if (difference_in_days <= 7) {
      weekCount += 1;
      retArr[2][0] += transport;
      retArr[2][1] += diet;
      retArr[2][2] += lifestyle;
      retArr[2][3] += home;
      retArr[2][4] += total;
      //add to the montly array and increment the count for that
      monthCount += 1;
      retArr[3][0] += transport;
      retArr[3][1] += diet;
      retArr[3][2] += lifestyle;
      retArr[3][3] += home;
      retArr[3][4] += total;
      //  console.log(retArr); //for debugging
    }
    else if (difference_in_days <= 31) {
      //add to the montly array and increment the count for that
      monthCount += 1;
      retArr[3][0] += transport;
      retArr[3][1] += diet;
      retArr[3][2] += lifestyle;
      retArr[3][3] += home;
      retArr[3][4] += total;
      // console.log(retArr); //for debugging
    }
  }

  for (let i = 0; i < 5; i++) {
    if (monthCount == 0) {
      continue;
    }
    retArr[3][i] /= monthCount; //averaging out the total
    retArr[3][i] = parseInt(retArr[3][i]); //make an int so no weird trailing numbers
    if (weekCount == 0) {
      continue;
    }
    retArr[2][i] /= weekCount; // for both :)
    retArr[2][i] = parseInt(retArr[2][i]);
  }

  res.json(retArr);
});

/* Finds all Entries where a user posted a submission*/
router.get('/getAll', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const user_entry = await UserEmissions.findAll({
    where: {
      user_id: req.user.id
    }
  });
  if (!user_entry || user_entry.length === 0) {
    console.log("Sending error code 404. No match found");
    return res.status(404).send(`404 : user with ${req.params.id} not found`);
  }
  res.status(200).json(user_entry);
});


/**
  GET request to retrieve user's emissions records for a specific year and month.
  @function
  @async
  @param {Object} req - Express request object.
  @param {Object} req.user - The authenticated user object.
  @param {number} req.user.id - The user ID.
  @param {Object} req.params - The URL parameters.
  @param {string} req.params.yearMonth - The year and month in the format "YYYY-MM".
  @param {Object} res - Express response object.
  @returns {Promise<void>} - A promise that resolves with no value upon completion.
*/
router.get('/yearMonth/:yearMonth', passport.authenticate('jwt', { session: false }), async function (req, res) {
  // Grab the user_id and month from the URL parameters
  const userId = req.user.id; // retrieve the user_id from the authenticated user
  const [currYear, currMonth] = req.params.yearMonth.split('-').map(str => parseInt(str));

  // Check if the user exists
  const user = await user_table.findByPk(userId);
  if (!user) {
    return res.status(400).send(`user_id ${userId} not found.`);
  }

  // Check if month is valid
  if (currMonth < 1 || currMonth > 12) {
    return res.status(404).send(`Invalid month: ${currMonth}`);
  }

  // Construct a date range that covers the entire month
  const startOfMonth = new Date(`${currYear}-${currMonth}-01`);
  const endOfMonth = new Date(`${currYear}-${currMonth}-31`);

  // Find data based on user_id and given month
  const records = await UserEmissions.findAll({
    where: {
      user_id: userId,
      date: {
        [Op.gte]: startOfMonth,
        [Op.lte]: endOfMonth
      }
    }
  });

  // Send a 204 No Content response if records is empty
  if (records.length === 0) {
    return res.status(204).send();
  }

  // Return the records as a JSON response
  return res.status(200).json(records);
});

/**
  Fetch recent emission records for all categories (author: Adam V.)
**/
router.post('/recentRecords', passport.authenticate('jwt', { session: false }), async function (req, res) {
  // Grab the user_id from the authenticated user
  const userId = req.user.id;

  // Find the 5 most recent records based on user_id
  const records = await UserEmissions.findAll({
    where: {
      user_id: userId
    },
    order: [
      ['date', 'DESC']
    ],
    limit: 5
  });

  // Send a 204 No Content response if records is empty
  if (records.length === 0) {
    return res.status(204).send();
  }

  // Return the records as a JSON response
  return res.status(200).json(records);
});

/**
  Retrieves a user's total emissions for the previous month for goal setting.
**/
router.post('/previousMonthEmissions', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const userId = req.user.id;

  // set up the date range from a month ago to today
  const now = new Date();
  const lastMonth = moment(now).subtract(1, 'month').format('YYYY-MM-DD');
  const today = moment(now).format('YYYY-MM-DD');

  // Find data based on user_id and given month
  const records = await UserEmissions.findAll({
    where: {
      [Op.and]: [
        { user_id: userId },
        { date: { [Op.between]: [lastMonth, today] } }
      ]
    },
    attributes: ['total_emissions'] // Only select the total_emissions column
  });

  // means this is a new user, show 0 pounds of CO2
  if (records.length === 0) {
    const records = [{ total_emissions: 0 }];  // create a new array with the total_emissions column
    return res.status(200).json(records);
  }

  return res.status(200).json(records);
});


/**
  Retrieves a user's total emissions for the previous calendar month for goal setting.
**/
router.post('/lastCalendarMonthEmissions', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const userId = req.user.id;

  // set up the date range from a month ago to today
  const now = new Date();
  const lastMonthStart = moment(now).subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
  const lastMonthEnd = moment(now).subtract(1, 'month').endOf('month').format('YYYY-MM-DD');


  // Find data based on user_id and given month
  const records = await UserEmissions.findAll({
    where: {
      [Op.and]: [
        { user_id: userId },
        { date: { [Op.between]: [lastMonthStart, lastMonthEnd] } }
      ]
    },
    attributes: ['total_emissions'] // Only select the total_emissions column
  });

  // means this is a new user, show 0 pounds of CO2
  if (records.length === 0) {
    const records = [{ total_emissions: 0 }];  // create a new array with the total_emissions column
    return res.status(200).json(records);
  }

  return res.status(200).json(records);
});


/**
  Retrieves a user's total emissions for the previous calendar month for goal setting.
**/
router.post('/thisCalendarMonthEmissions', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const userId = req.user.id;

  // set up the date range from a month ago to today
  const now = new Date();
  const thisMonthStart = moment(now).startOf('month').format('YYYY-MM-DD');
  const today = moment(now).format('YYYY-MM-DD');

  // Find data based on user_id and given month
  const records = await UserEmissions.findAll({
    where: {
      [Op.and]: [
        { user_id: userId },
        { date: { [Op.between]: [thisMonthStart, today] } }
      ]
    },
    attributes: ['total_emissions'] // Only select the total_emissions column
  });

  // means this is a new user, show 0 pounds of CO2
  if (records.length === 0) {
    const records = [{ total_emissions: 0 }];  // create a new array with the total_emissions column
    return res.status(200).json(records);
  }

  return res.status(200).json(records);
});

/**
  Retrieves a user's total emissions for the previous month for goal setting.
**/
router.post('/previousMonthLifestyleEmissions', passport.authenticate('jwt', { session: false }), async function (req, res) {
  const userId = req.user.id;

  // set up the date range from a month ago to today
  const now = new Date();
  const lastMonth = moment(now).subtract(1, 'month').format('YYYY-MM-DD');
  const today = moment(now).format('YYYY-MM-DD');

  // Find data based on user_id and given month
  const records = await UserEmissions.findAll({
    where: {
      [Op.and]: [
        { user_id: userId },
        { date: { [Op.between]: [lastMonth, today] } }
      ]
    },
    attributes: ['lifestyle_emissions'] // Only select the total_emissions column
  });

  // means this is a new user, show 0 pounds of CO2
  if (records.length === 0) {
    const records = [{ lifestyle_emissions: 0 }];  // create a new array with the total_emissions column
    return res.status(200).json(records);
  }

  return res.status(200).json(records);
});

/**********************
          POST
***********************/

/* Post the Entry into the user table - Section is left blank for Data Entry to input whichever algorithm marks their recordkeeping
   Subsequent Function Call to UpdateScore is dependant on there being at least one entry from the post request, hence it being at the end 
   Expected JSON Body : 
   {
        transport_emissions : Number, 
        total_emissions : Number,
        lifestyle_emissions : Number, 
        diet_emissions : Number, 
        home_emissions : Number
   }
   Each Number is to be lbs of CO2 from the day. 
*/
router.post('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
  //Verify User exists
  const user_entry = await user_table.findOne({
    where: {
      id: req.user.id
    }
  });
  if (!user_entry) {
    console.log("Sending error code 404. Submissions cannot be made for user's not in the database.");
    return res.status(404).send(`404 : user with ${req.user.id} not found`);
  }

  //Check if the necessary entries exist
  if (
    typeof req.body.transport_emissions != "number" ||
    typeof req.body.total_emissions != "number" ||
    typeof req.body.lifestyle_emissions != "number" ||
    typeof req.body.diet_emissions != "number" ||
    typeof req.body.home_emissions != "number"
  ) {
    return res.status(400).send(`400 : bad request. Body Does Not Contain Required Entries`);
  }

  for (const n of Object.values(req.body)) {
    if (n < 0) return res.status(400).send(`400 : bad request. No Negative Emissions`);
  }

  //Validate if user has already posted once today
  // Get the start of the current day in the user's timezone
  const moment = require('moment-timezone');
  const tz = 'America/Los_Angeles'; // Pacific Standard Time

  // Get the current date in the user's timezone
  const now = moment.tz(tz);

  // Get the start of the current day in the user's timezone
  const todaysStart = now.clone().startOf('day');

  // Get the end of the current day in the user's timezone
  const todaysEnd = now.clone().endOf('day');

  // Use the variables in the Sequelize query
  const todaysEntries = await UserEmissions.findAll({
    where: {
      user_id: req.user.id,
      date: {
        [Op.gte]: todaysStart,
        [Op.lt]: todaysEnd,
      }
    }
  });

  const today = new Date().toISOString().slice(0, 10);

  // if an entry already exists, update it
  if (todaysEntries.length > 0) {
    const { total_emissions, transport_emissions, lifestyle_emissions, diet_emissions, home_emissions } = todaysEntries[0];
    const newTotal = req.body.total_emissions + total_emissions;
    const newTrans = req.body.transport_emissions + transport_emissions;
    const newLifestyle = req.body.lifestyle_emissions + lifestyle_emissions;
    const newDiet = req.body.diet_emissions + diet_emissions;
    const newHome = req.body.home_emissions + home_emissions;

    await UserEmissions.update({
      total_emissions: newTotal,
      transport_emissions: newTrans,
      lifestyle_emissions: newLifestyle,
      diet_emissions: newDiet,
      home_emissions: newHome
    }, {
      where: {
        user_id: req.user.id,
        date: {
          [Op.gte]: todaysStart,
          [Op.lt]: todaysEnd,
        }
      }
    });
  }

  // otherwise, create a new entry
  else {
    await UserEmissions.create({
      user_id: req.user.id,                                 //Needs to change with sessions states
      date: sequelize.fn('STR_TO_DATE', today, '%Y-%m-%d'),
      total_emissions: req.body.total_emissions,
      transport_emissions: req.body.transport_emissions,
      lifestyle_emissions: req.body.lifestyle_emissions,
      diet_emissions: req.body.diet_emissions,
      home_emissions: req.body.home_emissions
    });
  }

  await UpdateScore(req.user.id);
  return res.status(200).send("Data Successfully posted to Database.");
});

module.exports = router;