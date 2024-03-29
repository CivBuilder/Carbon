/*
    Takes the amount of miles traveled by bus or train and returns the carbon produced
    Paramater
    miles - the miles taken on public transprot
    Return
    CO2 produced in lbs

*/
const calcPublic = (miles, type_of_transport) => {
    if(type_of_transport == "bus")
    {
        return Math.round(miles * 0.659182);
    }
    else if (type_of_transport == "train")
    {
        return Math.round(miles * 0.390218);

    }
    //source here https://blueskymodel.org/air-mile
    return 'error, please enter "train" or "bus"'; //error case
}

export default calcPublic;