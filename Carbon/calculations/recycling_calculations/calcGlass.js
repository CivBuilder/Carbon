/*
    Parameters:
    amount = number of pounds of Glass recycled

    Return:
    C02 in pounds saved by recycling Glass
*/
const calcGlass = (amount) => {
    return Math.round(2.75578 * amount);
    //source https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
}

export default calcGlass;