import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsernameInput from '../../../components/UsernameInput';
import PasswordInput from '../../../components/PasswordInput';
import { Colors } from '../../../styling/Colors';
import { logout } from '../../../util/LoginManager';
import ChangeUsernameButton from '../../../components/ChangeUsernameButton';
import ChangePasswordButton from '../../../components/ChangePasswordButton';
import { changeUsername, changePassword, changePFP } from '../../../util/UpdateAccountSettings';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import pfps from '../../../assets/profile-icons/index'
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';
import Svg, { Defs, Rect }  from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../../../components/LoadingIndicator';

const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;

const USER_API = API_URL + 'user/';

const SettingsScreen = ({ navigation }) => {

    // User data
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // Changing user data
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    // Change pfp modal
    const [modalVisible, setModalVisible] = useState(false);

    async function handleUsernameChange() {
        await changeUsername(username);
        await fetchUser();
    }
    async function handlePasswordChange() {
        await changePassword(oldPassword, newPassword);
        await fetchUser();
    }

    function handlePasswordMatch(pw){
        setConfirmPassword(pw);
        setPasswordMatch(pw === newPassword);
    }

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        var response = await fetch(USER_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken' : await getToken()
            }
        });

        if (response.status == 200) {
            setUser(await response.json())
            setLoadingUser(false);
        }
    }

    function onChangePFP() {
        setModalVisible(true);
    }

    function hideModal() {
        setModalVisible(false);
    }

    async function onSetPFP(index) {
        await changePFP(index);
        hideModal();
        await fetchUser();
    }

    return (
            <View style={{height: "100%", width: '100%'}}>
                <KeyboardAwareScrollView scrollEnabled={!modalVisible} style={styles.container} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                    <View style={styles.profileContainer}>
                        {!loadingUser? (
                        <View style={{borderRadius: 16, padding: 20}}>
                            <View>
                                <Image
                                    source={pfps[user.profile_selection]}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}
                                />
                                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                                    <Pressable onPress={onChangePFP}>
                                        <Text style={{fontSize: 16, color: Colors.primary.MINT}}>Edit</Text>
                                    </Pressable>
                                </View>
                            </View>

                            {/* Container for username and email */}
                            <View style={{marginTop: 20}}>

                                {/* Username */}
                                <View style={{marginBottom: 6}}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            textAlign: 'center',
                                            //Default font size 22. If username length > 20, make font size 18
                                            fontSize: user.username.length > 22 ? 16 : 22,
                                            fontWeight: '600'
                                        }}
                                    >
                                        @{user.username}
                                    </Text>
                                </View>

                                {/* Email */}
                                <View>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: user.username.length > 22 ? 14 : 18,
                                            fontWeight: '400'
                                        }}
                                    >
                                        {user.email}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        ) : (
                            <View style={{borderRadius: 16, height: 40}}>
                                <LoadingIndicator loading={loadingUser}/>
                            </View>
                        )}
                    </View>

                    {/* Change username */}
                    <View style={styles.content}>
                        <Text style={{...styles.generalText, textAlign:'left'}}>Change Username</Text>
                        <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)}/>
                    </View>
                    <ChangeUsernameButton onPress={async () => await handleUsernameChange()} disabled={!username || username===user.username}/>

                    {/* Change password */}
                    <View style={styles.content}>
                        <Text style={{...styles.generalText, textAlign:'left'}}>Change Password</Text>
                        {/* Change below line to use new api call to check if old password matches */}
                        <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setOldPassword(pw)}/>
                        <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setNewPassword(pw)}/>
                        <PasswordInput text="Confirm Password" testID="ConfirmPassword" onChangeText={pw => handlePasswordMatch(pw)}/>
                    </View>
                    <ChangePasswordButton onPress={async () => await handlePasswordChange()} disabled={(!oldPassword || !newPassword || !confirmPassword || !passwordMatch)}/>

                    {/* Logout */}
                    <View style={styles.content}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 2,
                                borderRadius: 12,
                                borderColor: Colors.secondary.RED,
                                backgroundColor: 'white',
                            }}
                            onPress={() => { logout() }}
                        >
                            <Text style={{color: Colors.secondary.RED, padding: 6, fontSize: 18, textAlign: 'center'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>
                {modalVisible && (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0, top: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0, top: '40%',
                                backgroundColor: "white",
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16
                            }}
                        >
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 24}}>
                                {pfps.map((item, index) => {
                                    return(
                                    <TouchableOpacity key={index} onPress={() => {onSetPFP(index)}}>
                                        <Image source={item} style={{height: 90, width: 90, margin: 12}}/>
                                    </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                )}
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
    },

    content: {
        width: 300,
        marginTop: 36,
        marginBottom: 10,
    },

    profileContainer: {
        margin: 10,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.RAISIN_BLACK,
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.125,
                shadowRadius: 2.5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default SettingsScreen;