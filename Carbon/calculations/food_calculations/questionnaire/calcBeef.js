/*
    Takes the pounds of beef consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
    SAME AS CALC BEEF WITHOUT MATH.ROUND
*/

const calcBeef = (pounds_consumed) => {
    return Number((pounds_consumed * 45/52).toFixed(3));
    //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
}

export default calcBeef