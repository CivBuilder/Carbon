import * as React from 'react';
import { View, Text } from 'react-native';
import Log from './Log';
export default function HomeScreen({navigation}) {
    return(
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                onPress={() =>
                    alert('This is the "Home" screen.')
                }
                style={{
                    fontSize: 26,
                    fontWeight: 'bold'
                }}
            >
            </Text>
            <Log></Log>
             {/*Please put this where it belongs once home is finished :) */}
        </View>
    )
}