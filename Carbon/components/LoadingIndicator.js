//Angel Quintanilla -

import { ActivityIndicator } from 'react-native';
import { Colors } from '../styling/Colors';

/**
 * 
 * @param loading - a state variable to determine if loading or not
 * @returns a null element or a loading screen indicator that will overlay over all existing elements
 */
export default function LoadingIndicator({loading}) {
    if(loading)
    return (<ActivityIndicator size="large" color={Colors.primary.RAISIN_BLACK} style={LoadingIndicatorStyle} testID="loading-indicator"/>)
    else return(null);
}


const LoadingIndicatorStyle = {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}
