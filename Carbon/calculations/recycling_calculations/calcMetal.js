/*
    Parameters:
    amount = number of pounds of metal recycled

    Return:
    C02 in pounds saved by recycling metal
*/
const calcMetal = (amount) => {
    return Math.round(2.20462 * amount);
    //source https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
}

export default calcMetal;