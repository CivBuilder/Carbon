import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
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
import { Platform } from "react-native";


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
            <ScrollView scrollEnabled={!modalVisible} style={styles.container} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                <View style={styles.profileContainer}>
                    {!loadingUser? ( 
                    <View style={{borderRadius: 16, paddingBottom: 20}}>
                        <View style={{position: 'absolute', height: 130, width: '100%', backgroundColor: Colors.primary.MINT, borderTopLeftRadius: 16, borderTopRightRadius: 16}}></View>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 22,
                            }}
                        >
                            Carbon User
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 22,
                                fontWeight: 'bold'
                            }}
                        >
                            {user.username}
                        </Text>
                        <Pressable onPress={onChangePFP} style={{padding: 15}}>
                            <Image
                                source={pfps[user.profile_selection]}
                                style={{
                                    height: 100,
                                    width: 100,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderColor: 'black',
                                }}
                            />
                        </Pressable>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 22,
                                fontWeight: 'bold'
                            }}
                        >
                            Email: {user.email}
                        </Text>
                    </View>
                    ) : (
                        <View style={{borderRadius: 16, height: 40}}>
                            <LoadingIndicator loading={loadingUser}/>
                        </View>
                    )}
                </View>

                {/* Change username */}
                <View style={styles.content}>
                    <Text style={styles.generalText}>Change username</Text>
                    <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)} />
                </View>
                <ChangeUsernameButton onPress={async () => await handleUsernameChange()} />

                {/* Change password */}
                <View style={styles.content}>
                    <Text style={styles.generalText}>Change password</Text>
                    {/* Change below line to use new api call to check if old password matches */}
                    <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setOldPassword(pw)} />
                    <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setNewPassword(pw)} />
                </View>
                <ChangePasswordButton onPress={async () => await handlePasswordChange()} />

                {/* Logout */}
                <View style={styles.content}>
                    <Button title='logout' onPress={() => { logout() }} />
                </View>

            </ScrollView>
            {modalVisible && (
            <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignSelf: 'center', paddingVertical: 40}}>
                    {pfps.map((item, index) => {
                        return(
                        <TouchableOpacity key={index} onPress={() => {onSetPFP(index)}}>
                            <Image source={item} style={{height: 120, width: 120, margin: 8}}/>
                        </TouchableOpacity>
                    )})}
                </ScrollView>
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