
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
  retArr= [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0]]; //Ret array
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
    difference_in_days = (todaysDate.getTime()-oldDate.getTime())/(1000 * 60 * 60 * 24); //gets diff in ms then converts to days

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
    else if (difference_in_days == 1) 
    {
      //Add to the yesterdays array
      retArr[1][0] = transport;
      retArr[1][1] = diet;
      retArr[1][2] = lifestyle;
      retArr[1][3] = home;
      retArr[1][4] = total;
    }
    else if (difference_in_days <= 7) 
    {
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
    else if (difference_in_days <= 31) 
    {
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

  for (let i = 0; i < 5; i++) 
  {
    if(monthCount == 0)
    {
      continue;
    }
    retArr[3][i] /= monthCount; //averaging out the total
    retArr[3][i] = parseInt(retArr[3][i]); //make an int so no weird trailing numbers
    if(weekCount == 0)
    {
      continue;
    }
    retArr[2][i] /= weekCount; // for both :)
    retArr[2][i] = parseInt(retArr[2][i]);
  }

  res.json(retArr);
});

module.exports = router;
