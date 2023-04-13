/*
    Takes the pounds of Cheese consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
*/

export const calcCheese = ({pounds_consumed}) => {
    return Math.round(pounds_consumed * 16.6792);
    //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/


}
