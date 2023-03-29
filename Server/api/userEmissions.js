
var express = require('express');
const { INTEGER } = require('sequelize');
var router = express.Router(); //the router
var UserEmissions = require('../models/UserEmissions.js'); //requires what we need
router.get('/', async function (req, res, next) {

  const date = new Date(); //get date
  day = date.getDate(); //grab the day and month
  month = date.getMonth() + 1;
  year = date.getFullYear();
  const todaysDate = new Date(year, month, day);

  const userId = req.query.user_id;
  const data = await UserEmissions.findAll(); //waits and then puts the data into content
  const content = data.filter(item => item.user_id == userId);
  // retArr = [[100, 200, 300, 400, 500], [500, 545, 100, 555, 100], [100, 200, 300, 400, 500], [800, 200, 750, 600, 500]]; //Temp array for data
  weekCount = 0;
  monthCount = 0;
  retArr = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]; //Ret array
  for (const obj of content) {
    const value = obj.date;
    //grabbing all the necessary values for comapring dates
    checkMonth = value.substring(5, 7);
    checkDay = value.substring(8, 11);
    checkYear = value.substring(0, 4);
    //grabbing the emissions for the relevant data set
    transport = obj.transport_emissions;
    diet = obj.diet_emissions;
    lifestyle = obj.lifestyle_emissions;
    home = obj.home_emissions;
    total = obj.total_emissions;
    const oldDate = new Date(checkYear, checkMonth, checkDay);
    difference_in_days = (todaysDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24); //gets diff in ms then converts to days

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
router.get('/:id', async function (req, res, next) {
  const user_entry = await user_emissions_table.findAll({
    where: {
      user_id: req.params.id
    }
  });
  if (!user_entry || user_entry.length === 0) {
    console.log("Sending error code 404. No match found");
    return res.status(404).send(`404 : user with ${req.params.id} not found`);
  }
  res.status(200).json(user_entry);
});

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
router.post('/:id', async function (req, res, next) {
  //Verify User exists
  const user_entry = await user_table.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!user_entry) {
    console.log("Sending error code 404. Submissions cannot be made for user's not in the database.");
    return res.status(404).send(`404 : user with ${req.params.id} not found`);
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
  const today = new Date().toISOString().slice(0, 10);

  await user_emissions_table.create({
    user_id: req.params.id,                                 //Needs to change with sessions states
    date: sequelize.fn('STR_TO_DATE', today, '%Y-%m-%d'),
    total_emissions: req.body.total_emissions,
    transport_emissions: req.body.transport_emissions,
    lifestyle_emissions: req.body.lifestyle_emissions,
    diet_emissions: req.body.diet_emissions,
    home_emissions: req.body.home_emissions
  });

  await UpdateScore(req.params.id);
  return res.status(200).send("Data Successfully posted to Database.");
});

module.exports = router;
