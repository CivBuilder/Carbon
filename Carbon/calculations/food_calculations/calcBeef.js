/*
    Takes the pounds of beef consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
*/

const calcBeef = (pounds_consumed) => {
    return Math.round(pounds_consumed * 45);
    //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
}

export default calcBeef