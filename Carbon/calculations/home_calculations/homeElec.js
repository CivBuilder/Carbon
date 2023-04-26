/*
    This functions takes in megawatt hours of eletricity used and returns estimated carbon emissions.
    This is very much an estimate since every households way of obtaining eletricity is different
    Parameters
    megawatt_hours = The amount of megawatt hours consumed

    Return
    The amount of CO2 emitted based off that in lbs
*/

const homeElec = (megawatt_hours) => {
    return Math.round(megawatt_hours * 884.2);
    //calculation obtained from https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references (Again, very much so an estimate)
}
export default homeElec;