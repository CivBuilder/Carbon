/*
    Takes the pounds of vegetables consumed and returns an estimate of how much CO2 is emitted (in pounds)
    Paramter
    pounds_consumed (self explantory)
    Return
    CO2 produced in lbs
*/

const calcVegetables = (pounds_consumed) => {
    return Math.round(pounds_consumed * 0.5);
    // Source: Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992.
    // DOI: 10.1126/science.aaq0216
}

export default calcVegetables
