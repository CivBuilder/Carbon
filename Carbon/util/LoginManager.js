import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../config/Api';

import { profanities } from '../components/Profanities';
import { changeUsername } from './UpdateAccountSettings';

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
            console.log(response.status);
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

export async function signup(username, email, password, confirm) {
    if (password != confirm) {
        alert("Passwords do not match.");
        return false;
    }

    if (username === "" || email === "" || password === "" || confirm === "") {
        alert("Please fill out all fields.");
        return false;
    }

    if(!validateEmail(email)) {
        alert("Please enter a valid email.");
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

    await fetch(API_URL + 'user/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }
    );

    await login(email, password);

    await changeUsername(username);
}

export async function logout() {
    console.log("Logging out");
    await AsyncStorage.clear();
    renderCallback(await getToken());
}

export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$,%,&,*,@,!])[A-Za-z\d$,%,&,*,@,!]{8,}$/;
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

    // Check for length (minimum 3 characters, maximum 30)
    if (username.length < 3 || username.length > 30) {
        return false;
    }

    return true; // username is valid
}