/*
    Takes the pounds of poultry consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
*/

export const calcPoultry = ({pounds_consumed}) => {
    return pounds_consumed * 8.55;
        //source https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/

}