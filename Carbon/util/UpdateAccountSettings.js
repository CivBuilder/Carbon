import { validatePassword } from "./LoginManager";

export async function changeUsername(username) {
    // pass the username into the API to change it
    // will need to check if the username is already in use, if so, return false
    // if the username is not in use, return true and change the username in the DB
}

export async function changePassword(oldPassword, newPassword) {
    if (!validatePassword(newPassword)) {
        console.log("Password does not meet requirements. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character ($,%,&,*,@,!).");
        return false;
    }

    // pass the old password into the API to check if it matches
    // pass the new password into the API to change it if the old password matches.
    // do both of these in one API call
}