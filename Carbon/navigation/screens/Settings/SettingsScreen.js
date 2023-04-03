import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { logout } from '../../../util/LoginManager';

export default function SettingsScreen({navigation}) {
    return(
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Button title='logout' onPress={() => {logout()}}/>
            <Text
                onPress={() =>
                    navigation.navigate('Home')
                }
                style={{
                    fontSize: 26,
                    fontWeight: 'bold'
                }}
            >
                Settings Screen
            </Text>
        </View>
    )
}