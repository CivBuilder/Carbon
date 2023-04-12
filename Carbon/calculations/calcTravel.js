/*
    Takes the amount of miles traveled by plane and returns the carbon produced
    Paramater
    miles - the miles flown on a plane
    Return
    CO2 produced in lbs

*/

export const calcRecycling = ({miles}) => {
    return miles * 53;
    //source here https://blueskymodel.org/air-mile
}
