import { validatePassword } from "./LoginManager";
import { API_URL } from "../config/Api";
import { getToken } from "./LoginManager";

const API_CHANGE_USERNAME_URL = API_URL + 'user/changeUsername/';
const API_CHANGE_PASSWORD_URL = API_URL + 'user/changePassword/';
const API_CHANGE_PFP_URL = API_URL + 'user/changePFP/';

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
        .catch(error => alert(error));
}

export async function changePassword(oldPassword, newPassword) {
    // make sure new password matches regex
    if (!validatePassword(newPassword)) {
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
        .catch(error => alert(error));
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