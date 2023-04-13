/*This function takes in the amount of miles traveled and your cars mpg and calculates C02 emitted (In pounds)
    Parameters  
    miles_driven = Amount of miles drove
    gas_mileage = The vehicles gas mileage (defaults to 24.2 (average car's mpg in america))

    Return
    C02 in pounds emitted by your driving session

*/

export const calcCar = ({miles_driven, gas_mileage}) => {
    gallonsConsumed = 0; 
    if(gas_mileage == undefined) //if undefined we use the default gallons consumed
    {
        gallonsConsumed = miles_driven/24.2;
    } 
    else
    {
        gallonsConsumed = miles_driven/gas_mileage; 
    }

    return Math.round(19.59248 * gallonsConsumed); //19.59248 is the amount of C02 in pounds emitted per g allon of gasoline burned 
    //source for the above calcualtion is here https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references "Gallons of gaslonine consumed"
    //Please note obviously this is an estimate based on the cars MPG and not 100% accurate as mpg varies often.
} 
