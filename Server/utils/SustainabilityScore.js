//Angel Quintanilla 
//  
//  Map each rank with an expected yearly carbon footprint
//      
//  Top Rank and Rank 4 determined by the following source :
//      https://www.nature.org/en-us/get-involved/how-to-help/carbon-footprint-calculator/#:~:text=A%20carbon%20footprint%20is%20the,is%20closer%20to%204%20tons.
//
//  
const SustainabilityMap = {
    0   :   35000,
    1   :   30000,
    2   :   25000,
    3   :   20000,
    4   :   16000,
    5   :   11000,
    6   :   7000,
    7   :   6000,
    8   :   4000,
    9   :   3000,
    10  :   2000,
}

const SUSTAINABILITY_POSITIVE_BAR = 7

module.exports= {SustainabilityMap, SUSTAINABILITY_POSITIVE_BAR}
