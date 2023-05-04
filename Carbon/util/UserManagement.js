import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../config/Api';
import { profanities } from '../components/Profanities';
import { useToast } from 'react-native-toast-notifications';

const API_CHANGE_USERNAME_URL = API_URL + 'user/changeUsername/';
const API_CHANGE_PASSWORD_URL = API_URL + 'user/changePassword/';
const API_CHANGE_PFP_URL = API_URL + 'user/changePFP/';

function renderCallback() {
    console.log("renderCallback not assigned in LoginManager.js, signin signout won't rerender.");
};

export async function getAuthHeader() {
    return { headers: { "secrettoken": await getToken() } };
}

export function setRenderCallback(cb) {
    renderCallback = cb;
}

export async function getToken() {
    return await AsyncStorage.getItem('secrettoken');
}

export async function login(username, password) {
    try {
        // Working around url encode form because react native doesn't support it
        var details = {
            'email': username,
            'password': password
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var response = await fetch(API_URL + 'user/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            }
        );

        if (response.status != 200) {
            // console.log(response.status);
            alert('Login failed, please try again.');
            return false;
        }

        const data = await response.json();
        await AsyncStorage.setItem('secrettoken', data.token);
        renderCallback(await getToken());
    } catch (error) {
        console.error(error);
    }
}

export async function changeUsername(username) {
    if (!validateUsername(username)) {
        alert("Does not meet requirements:\n\n" +

            "- Must be between 3-20 characters long\n" +

            "- Must not contain profanity\n" +
            "- Must not contain special characters\n" +
            "- Must not contain spaces")
        return false;
    }

    try {
        const response = await fetch(API_CHANGE_USERNAME_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
            body: JSON.stringify({ username: username })
        })
        const text = await response.text();
        // console.log(response.status)
        // console.log(text)
        if (response.status == 500 && text.includes("already use")) {
            alert('Username already in use.');
            return false;
        } else if (response.status == 500 && text.includes("Server error")){
            alert("There was a problem with the server. Please try again later.")
            return false;
        } else if(response.status == 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function signup(username, email, password, confirm) {
    if (password != confirm) {
        alert("Passwords do not match.");
        return false;
    }

    if (username === "" || email === "" || password === "" || confirm === "") {
        alert("Please fill out all fields.");
        return false;
    }

    if (!validateUsername(username)) {
        alert("Invalid username.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Invalid email.");
        return false;
    }

    if (!validatePassword(password)) {
        // Define the error messages
        const errors = [
            "Password must fulfill these requirements:",
            "Must be at least 8 characters long",
            "Must contain at least one uppercase letter",
            "Must contain at least one lowercase letter",
            "Must contain at least one number",
            "Must contain at least one special character ($,%,&,*,@,!)"
        ];

        // Build the error message string
        const errorMessage = errors.join("\n");

        // Show the error message in a popup
        alert(errorMessage);
        return false;
    }

    var details = {
        'email': email,
        'password': password
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var result = await fetch(API_URL + 'user/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }
    );

    console.log(await result.text());
    if (result.status == 200) {
        await login(email, password);
        await changeUsername(username);
    } else {
        // alert('Username or email already taken!');
        useToast().show('Username or email already taken.', { type: 'danger' })
        return false;
    }

}

export async function logout() {
    // console.log("Logging out");
    await AsyncStorage.clear();
    renderCallback(await getToken());
}

export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$,%,&,*,@,!,#,^])[A-Za-z\d$,%,&,*,@,!,#,^]{8,}$/;
    return regex.test(password);
}

export function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

export function validateUsername(username) {
    // Check for bad words/slurs
    for (const profanity of profanities) {
        if (username.toLowerCase().includes(profanity.toLowerCase())) {
            return false; // username contains a bad word/slur
        }
    }

    // Check for SQL injection attacks
    const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'TRUNCATE'];
    for (const keyword of sqlKeywords) {
        if (username.toUpperCase().includes(keyword)) {
            return false; // username contains a SQL keyword
        }
    }

    // Check for special characters except '_', '-', and '.'
    const regex = /^[a-zA-Z0-9_.-]*$/;
    if (!regex.test(username)) {
        return false;
    }


    // Check for length (minimum 3 characters, maximum 20)
    if (username.length < 3 || username.length > 20) {

        return false;
    }

    return true; // username is valid
}

export async function changePassword(oldPassword, newPassword) {
    // make sure new password matches regex
    if (!validatePassword(newPassword)) {
        // Define the error messages
        const errors = [
            "Does not meet requirements:\n",
            "- Must be at least 8 characters long",
            "- Must contain at least 1 uppercase letter",
            "- Must contain at least 1 lowercase letter",
            "- Must contain at least 1 number",
            "- Must contain at least 1 special character ($,%,&,*,@,!)"
        ];

        // Build the error message string
        const errorMessage = errors.join("\n");

        // Show the error message in a popup
        alert(errorMessage);
        return false;
    }

    // make sure new password is not the same as the old password
    if (newPassword === oldPassword) {
        alert("New password cannot be the same as the old password!");
        return false;
    }

    try {
        const response = await fetch(API_CHANGE_PASSWORD_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
        });
        const text = await response.text();
        // console.log(response.status)
        // console.log(text)
        // Check if the response indicates that the old password was not found
        if (response.status === 500 || text.includes("doesn't match")) {
            alert("The old password you entered does not match the password in our records. Please try again.");
            return false;
        }
        if(response.status === 200){
            // console.log("Password changed successfully")
            return true;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function changePFP(selection) {
    const res = await fetch(API_CHANGE_PFP_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secrettoken': await getToken(),
        },
        body: JSON.stringify({ profile_selection: selection })
    });
}