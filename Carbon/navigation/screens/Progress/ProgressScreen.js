import * as React from 'react';
import { View, Text } from 'react-native';
import DwmLog from './DwmLog';

export default function ProgressScreen({navigation}) {
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
                    navigation.navigate('Home')
                }
                style={{
                    fontSize: 26,
                    fontWeight: 'bold'
                }}
            >
            </Text>
            <DwmLog></DwmLog>
        </View>
    )
}