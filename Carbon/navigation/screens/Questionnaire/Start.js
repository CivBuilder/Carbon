import {View, Text,Button} from 'react-native';
import { Colors } from '../../../colors/Colors';

/*
Start Screen -> Leads to the first question for questionnaire.js
TODO: Add UI to align the aesthetic with the rest of the app
*/
export default function StartScreen({navigation}){
    return (
        <>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        <Text>Tell us about yourself</Text>
        </View>
        <View style={{
            flex: 0,
        }}>
        <Button
        title="Get Started"
        color={Colors.primary.MINT}
        onPress={() =>
            navigation.navigate('q1')
        }
        />
        </View>
        </>
    )
}