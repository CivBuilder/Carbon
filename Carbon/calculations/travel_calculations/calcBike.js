/*
    Parameters:
    miles_traveled = amount of miles traveled by bike

    Return:
    C02 in pounds emitted from biking
*/
const calcBike = (miles_traveled) => {
    return Math.round(.0727525 * miles_traveled);
    //source https://www.sciencedirect.com/science/article/pii/S0959378021000030
}

export default calcBike;