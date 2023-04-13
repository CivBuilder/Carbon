/*
    Takes the amount of bottled used in a day that are not recycled
    Paramater
    bottles - the bottles wasted today
    Return
    CO2 produced in lbs

*/
//we not using this right now
export const calcBottles = ({bottles}) =>
{
    return Math.round(bottles * .343);
    //source https://tappwater.co/en/carbon-footprint-bottled-water-2/#:~:text=Based%20on%20the%20most%20cited,592%20km)%20with%20a%20car.   
}