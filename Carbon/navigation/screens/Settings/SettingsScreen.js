import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import UsernameInput from '../../../components/UsernameInput';
import PasswordInput from '../../../components/PasswordInput';
import { Colors } from '../../../colors/Colors';
import { logout } from '../../../util/LoginManager';
import ChangeUsernameButton from '../../../components/ChangeUsernameButton';
import ChangePasswordButton from '../../../components/ChangePasswordButton';
import { changeUsername, changePassword } from '../../../util/UpdateAccountSettings';

const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;

const SettingsScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    async function handleUsernameChange() {
        await changeUsername(username);
    }
    async function handlePasswordChange() {
        await changePassword(oldPassword, newPassword);
    }

    return (
        <View style={styles.container}>

            {/* Change username */}
            <View style={styles.content}>
                <Text style={styles.generalText}>Change username</Text>
                <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)} />
            </View>
            <ChangeUsernameButton onPress={() => handleUsernameChange()} />

            {/* Change password */}
            <View style={styles.content}>
                <Text style={styles.generalText}>Change password</Text>
                {/* Change below line to use new api call to check if old password matches */}
                <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setOldPassword(pw)} />
                <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setNewPassword(pw)} />
            </View>
            <ChangePasswordButton onPress={() => handlePasswordChange()} />

            {/* Logout */}
            <View style={styles.content}>
                <Button title='logout' onPress={() => { logout() }} />
            </View>
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
    container: {
        flex: 1,
        backgroundColor: '#F7FCF8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: 300,
    },
});

export default SettingsScreen;