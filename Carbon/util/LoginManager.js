import AsyncStorage from '@react-native-async-storage/async-storage'



function renderCallback() {
    console.log("renderCallback not assigned in LoginManager.js, signin signout won't rerender.");
};

export async function getAuthHeader() {
    return { headers: {"secret_token": await getToken() }};
}

export function setRenderCallback(cb) {
    renderCallback = cb;
}

export async function getToken() {
    return await AsyncStorage.getItem('secret_token');
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

        var response = await fetch('http://192.168.0.150:3000/api/user/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            }
        );

        if (response.status != 200) {
            console.log('login failed, TODO: handle this in ui somehow');
            return false;
        }

        const data = await response.json();
        await AsyncStorage.setItem('secret_token', data.token);
        renderCallback(await getToken());
    } catch (error) {
        console.error(error);
    }
}

export async function signup(username, password, confirm) {
    console.log(username, password, confirm);

    if (password != confirm || username === "" || password === "") {
        console.log("Passwords do not match, or empty TODO: handle this in the UI");
        return false;
    }

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

    var response = await fetch('http://192.168.0.150:3000/api/user/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }
    );
}

export async function logout() {
    console.log("Logging out");
    await AsyncStorage.clear();
    renderCallback(await getToken());
}