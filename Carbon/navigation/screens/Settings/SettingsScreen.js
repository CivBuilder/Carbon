import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable, Animated, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsernameInput from '../../../components/UsernameInput';
import PasswordInput from '../../../components/PasswordInput';
import { Colors } from '../../../styling/Colors';
import { logout } from '../../../util/UserManagement';
import ChangeUsernameButton from '../../../components/ChangeUsernameButton';
import ChangePasswordButton from '../../../components/ChangePasswordButton';
import { changeUsername, changePassword, changePFP } from '../../../util/UserManagement';
import pfps from '../../../assets/profile-icons/index'
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/UserManagement';
import LoadingIndicator from '../../../components/LoadingIndicator';
import CalculationsButton from '../../../components/CalculationsButton';
import { ScreenNames } from '../Main/ScreenNames';
import { useToast } from 'react-native-toast-notifications';

const USER_API = API_URL + 'user/';

const SettingsScreen = ({ navigation }) => {

    // User data
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // Changing user data
    const [username, setUsername] = useState('');
    const [usernameChanged, setUsernameChanged] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    // Change pfp modal
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    const toast = useToast();

    async function handleUsernameChange() {
        if(username === user.username) {
            alert("Username is the same as current username!");
        } else {
            setUsernameChanged(await changeUsername(username));
            await fetchUser();
        }
    }
    async function handlePasswordChange() {
        if(newPassword != confirmPassword) {
            alert("Passwords do not match!");
        } else {
            setPasswordChanged(await changePassword(oldPassword, newPassword));
            await fetchUser();
        }
    }

    useEffect(() => {
        if (usernameChanged) {
            // alert("Username changed successfully!");
            toast.show("Username changed successfully!", {  type: 'success' });
            setUsernameChanged(false);
            setUsername('');
        }
    }, [usernameChanged]);

    useEffect(() => {
        if (passwordChanged) {
            // alert("Password changed successfully!");
            toast.show("Password changed successfully!", { type: 'success' });
            setPasswordChanged(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [passwordChanged]);

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        var response = await fetch(USER_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken()
            }
        });

        if (response.status == 200) {
            setUser(await response.json())
            setLoadingUser(false);
        }
    }

    function onChangePFP() {
        setModalVisible(true);
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    const hideModal = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    async function onSetPFP(index) {
        await changePFP(index);
        hideModal();
        await fetchUser();
    }

    return (
        <View style={{ height: "100%", width: '100%' }}>
            <KeyboardAwareScrollView scrollEnabled={!modalVisible} style={styles.container} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                {/* Profile */}
                <View style={styles.profileContainer}>
                    {!loadingUser ? (
                        <View style={{ borderRadius: 16, padding: 20 }}>
                            <Image
                                source={pfps[user.profile_selection]}
                                style={{ height: 100, width: 100, alignSelf: 'center', justifyContent: 'center' }}
                            />
                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                <Pressable onPress={onChangePFP}>
                                    <Text style={{ fontSize: 16, color: Colors.primary.MINT }}>Edit</Text>
                                </Pressable>
                            </View>

                            {/* Container for username and email */}
                            <View style={{ marginTop: 12 }}>
                                {/* Username */}
                                <Text style={{ textAlign: 'center', fontSize: user.username.length > 22 ? 16 : 22, fontWeight: '600', marginBottom: 6 }}>
                                    {user.username}
                                </Text>

                                {/* Email */}
                                <Text style={{ textAlign: 'center', fontSize: user.username.length > 22 ? 14 : 18, fontWeight: '400' }}>
                                    {user.email}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={{ borderRadius: 16, height: 242 }}>
                            <LoadingIndicator loading={loadingUser} />
                        </View>
                    )}
                </View>

                {/* Change username */}
                <View style={styles.content}>
                    <Text style={{ ...styles.generalText, textAlign: 'left' }}>Change Username</Text>
                    <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)} value={username}/>
                </View>
                <ChangeUsernameButton onPress={async () => await handleUsernameChange()} disabled={!username} />

                {/* Change password */}
                <View style={styles.content}>
                    <Text style={{ ...styles.generalText, textAlign: 'left' }}>Change Password</Text>
                    {/* Change below line to use new api call to check if old password matches */}
                    <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setOldPassword(pw)} value={oldPassword}/>
                    <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setNewPassword(pw)} value={newPassword}/>
                    <PasswordInput text="Confirm Password" testID="ConfirmPassword" onChangeText={pw => setConfirmPassword(pw)} value={confirmPassword}/>
                </View>
                <ChangePasswordButton onPress={async () => await handlePasswordChange()} disabled={(!oldPassword || !newPassword || !confirmPassword)} />

                {/* Calculation details */}
                <View style={styles.content}>
                    <Text style={styles.generalText}>See how we do our calculations</Text>
                </View>
                <CalculationsButton onPress={() => navigation.navigate(ScreenNames.CALCULATION_DETAILS)} />

                {/* Logout */}
                <View style={styles.content}>
                    <TouchableOpacity
                        style={{ borderRadius: 12, backgroundColor: Colors.secondary.RED }}
                        onPress={() => { logout() }}
                    >
                        <Text style={{ color: 'white', padding: 6, fontSize: 18, textAlign: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

            {modalVisible && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}>
                    <Animated.View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', opacity: fadeAnimation }} />
                    <Animated.View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, transform: [{ translateY: fadeAnimation.interpolate({ inputRange: [0, 1], outputRange: [500, 0], }) }] }}>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0, top: '40%',
                                backgroundColor: "white",
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16
                            }}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 12 }}>
                                    {pfps.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => { onSetPFP(index) }}>
                                                <Image source={item} style={{ height: 90, width: 90, margin: 12 }} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                                <View style={{ alignContent: 'center', margin: 12 }}>
                                    <TouchableOpacity onPress={hideModal}
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: 12,
                                            borderWidth: 2,
                                            borderColor: "gray",
                                            padding: 6,
                                            width: '50%',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: "gray", textAlign: 'center' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Animated.View>
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
        backgroundColor: Colors.primary.MINT_CREAM,
    },

    content: {
        width: 300,
        marginTop: 20,
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