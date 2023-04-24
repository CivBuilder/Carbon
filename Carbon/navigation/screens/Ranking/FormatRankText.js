/**
 * Menial function to use across both the main and mini versions of the ranking screen 
 * @param {*} rank - number to use 
 * @returns 
 */
function formatRankText(rank) {
    if(typeof rank != Number)
        throw new Error('Parameter is not of type Number.');
    
    switch(rank % 10) {
        case 1: 
            return rank+"st";
        case 2: 
            return rank+"nd";
        case 3:
            return rank+"rd";
        default: 
            return rank+"th";
    }
}