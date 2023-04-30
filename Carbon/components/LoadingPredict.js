//Jonas Snell :)) -
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Colors } from '../styling/Colors';
import { Image } from 'react-native-svg';

/**
 * 
 * @param loading - a state variable to determine if loading or not
 * @returns a null element or a loading screen indicator that will overlay over all existing elements
 */
export default function LoadingPredict({ loading }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    if (loading)
        return (<View style={{ marginVertical: 24  }}>
           <Image
                        source={require('../assets/rank-icons/rank-icon-1.png')}

                        resizeMode='contain'
                        style={{
                            width: Dimensions.get('window').width * 0.35,
                            height: Dimensions.get('window').width * 0.35,
                        }}
                    />


        </View>)
    else return (null);
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
