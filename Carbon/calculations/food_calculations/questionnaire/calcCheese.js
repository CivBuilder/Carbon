/*
    Takes the pounds of Cheese consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
    SAME AS CALC CHEESE WITHOUT MATH.ROUND
*/

const calcCheese = (pounds_consumed) => {
    return Number((pounds_consumed * 11.0/52).toFixed(3));
    // Source: Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992.
    // DOI: 10.1126/science.aaq0216
}
export default calcCheese;