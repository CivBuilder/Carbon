import { validatePassword } from "./LoginManager";
import { API_URL } from "../config/Api";
import { getToken, getAuthHeader } from "./LoginManager";

const API_CHANGE_USERNAME_URL = API_URL + 'user/changeUsername/';
const API_CHANGE_PASSWORD_URL = API_URL + 'user/changePassword/';

export async function changeUsername(username) {
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

export async function changePassword(oldPassword, newPassword) {
    // make sure new password matches regex
    if (!validatePassword(newPassword)) {
        console.log("Password does not meet requirements. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character ($,%,&,*,@,!).");
        return false;
    }

    // change the password in the database if the old password matches the one in the database
    await fetch(API_CHANGE_PASSWORD_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secrettoken': await getToken(),
        },
        body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}