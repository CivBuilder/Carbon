import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import UsernameInput from '../../../components/UsernameInput';
import PasswordInput from '../../../components/PasswordInput';
import { Colors } from '../../../colors/Colors';
import { logout } from '../../../util/LoginManager';

const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;

const SettingsScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* <Text
                onPress={() =>
                    navigation.navigate('Home')
                }
                style={{
                    fontSize: 26,
                    fontWeight: 'bold'
                }}
            >           </Text> */}
            {/* Settings */}

            {/* Change username */}
            <Text style={styles.generalText}>Change username</Text>
            <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)} />
            {/* add a button with an api call to change the username */}
            <NonBreakingSpace />

            {/* Change password */}
            <Text style={styles.generalText}>Change password</Text>
            {/* Change below line to use new api call to check if old password matches */}
            <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setPassword(pw)} />
            <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setPassword(pw)} />
            {/* add a button with an api call to change the password */}
            <Button title='logout' onPress={() => { logout() }} />
        </View>
    )
}

const styles = StyleSheet.create({
    generalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        textAlign: 'center',
    },
});

export default SettingsScreen;