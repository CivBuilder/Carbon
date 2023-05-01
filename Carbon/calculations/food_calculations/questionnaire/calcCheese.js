/*
    Takes the pounds of Cheese consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
    SAME AS CALC CHEESE WITHOUT MATH.ROUND
*/

const calcCheese = (pounds_consumed) => {
    return Number((pounds_consumed * 16.6792/52).toFixed(3));
    //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
}
export default calcCheese;