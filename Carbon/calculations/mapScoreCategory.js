//A higher score is better
//Use to map the user's score to a category (in SustainabilityScoreProfileView.js)
const mapScoreCategory = (score) => {
    if(score>=0 && score <= .1){
        return 0;
    }else if (score < .2){
        return 1;
    }else if (score < .3){
        return 2;
    }else if (score <.4){
        return 3;
    }else if (score <.5){
        return 4;
    }else if (score < .6){
        return 5;
    }else if (score< .7){
        return 6;
    }else if (score < .8){
        return 7;
    }else if (score < .9){
        return 8;
    }else if (score<.95){
        return 9;
    }
    return 10;
}
export default mapScoreCategory;
