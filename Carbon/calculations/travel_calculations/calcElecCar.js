/*This function takes in the amount of miles traveled by eletric car and calculates C02 emitted (In pounds)
    Parameters  
    miles_driven = Amount of miles drove

    Return
    C02 in pounds emitted by your driving session

*/

export const calcElecCar = ({ miles_driven }) => {
    return Math.round(0.771618 * miles_driven); 
    //source https://climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars#:~:text=The%20researchers%20found%20that%2C%20on,vehicle%20created%20just%20200%20grams.
} 
