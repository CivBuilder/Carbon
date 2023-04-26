//Score is mapped in ascending order (higher is good, lower is bad)
const mapScoreReverse = (userPerformance) => {
    if(userPerformance>=0 && userPerformance <= .3){
        return 0;
    }else if (userPerformance <= .4){
        return .1;
    }else if (userPerformance <= .55){
        return .2;
    }else if (userPerformance <=.7){
        return .3;
    }else if (userPerformance < 1){
        return .4;
    }else if (userPerformance >= 1 && userPerformance <= 1.1){
        return .5;
    }else if (userPerformance>1.1 && userPerformance<=1.4){
        return .6;
    }else if (userPerformance>1.4 && userPerformance <= 1.5){
        return .7;
    }else if (userPerformance>1.5 && userPerformance <= 1.85){
        return .8;
    }else if (userPerformance>1.85 && userPerformance < 2){
        return .9;
    }
    return 1;
}
export default mapScoreReverse;
