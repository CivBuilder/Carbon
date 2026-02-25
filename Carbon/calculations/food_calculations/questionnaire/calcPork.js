/*
    Takes the pounds of pork consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
    SAME AS CALC PORK WITHOUT MATH.ROUND
*/

const calcPork = (pounds_consumed) =>
{
    return Number((pounds_consumed * 7.6/52).toFixed(3));
    // Source: Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992.
    // DOI: 10.1126/science.aaq0216
}

export default calcPork;