const mapScore = (userPerformance) => {
    if(userPerformance>=0 && userPerformance <= .1){
        return 1;
    }else if (userPerformance <= .15){
        return .9;
    }else if (userPerformance <= .25){
        return .8;
    }else if (userPerformance <=.45){
        return .7;
    }else if (userPerformance <= .75){
        return .6;
    }else if (userPerformance > .75 && userPerformance <= 1){
        return .5;
    }else if (userPerformance>1 && userPerformance<=1.25){
        return .4;
    }else if (userPerformance>1.25 && userPerformance <= 1.4){
        return .3;
    }else if (userPerformance>1.4 && userPerformance <= 1.45){
        return .2;
    }else if (userPerformance>1.45 && userPerformance <= 1.5){
        return .1;
    }
    return 0;
}
export default mapScore;
