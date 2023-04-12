/*
    Takes the pounds of pork consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
*/

export const calcPork = ({pounds_consumed}) =>
{
    return pounds_consumed * 11.7;
    //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/

}