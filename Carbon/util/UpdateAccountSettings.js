import { validatePassword } from "./LoginManager";
import { API_URL } from "../config/Api";
import { getToken } from "./LoginManager";

const API_CHECK_USERNAME_URL = API_URL + 'user/checkUsername/';
const API_CHANGE_USERNAME_URL = API_URL + 'user/changeUsername/';
const API_CHANGE_PASSWORD_URL = API_URL + 'user/changePassword/';
const API_CHECK_PASSWORD_URL = API_URL + 'user/checkPassword/';
const API_CHANGE_PFP_URL = API_URL + 'user/changePFP/';

export async function changeUsername(username) {
    // check if the username already exists in the DB
    const res = await fetch(API_CHECK_USERNAME_URL + "?username=" + username, {
        method: 'GET',
        headers: {
            'secrettoken': await getToken(),
        }
    });

    if (res.status === 200) {
        const resContent = await res.json();
        // if username already exists error, else put it
        if (resContent === true) {
            // TODO: turn this into a front-end error
            console.log("Error, username already exists. Please choose another username.");
        }
        else {
            await fetch(API_CHANGE_USERNAME_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken(),
                },
                body: JSON.stringify({ username: username })
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    }
}

export async function changePassword(oldPassword, newPassword) {
    if (!validatePassword(newPassword)) {
        console.log("Password does not meet requirements. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character ($,%,&,*,@,!).");
        return false;
    }

    const res = await fetch(API_CHECK_PASSWORD_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'secrettoken': await getToken(),
        },
        body: JSON.stringify({ password: oldPassword })
    });
    const resContent = await res.json();
    if (resContent === true) {
        // change the password as the old password matches the DB
        await fetch(API_CHANGE_PASSWORD_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
            body: JSON.stringify({ password: newPassword })
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    else {
        // TODO: Change this to a real front-end error
        console.log('Error, old password does not match our records. Please try again.')
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