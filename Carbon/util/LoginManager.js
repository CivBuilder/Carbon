import AsyncStorage from '@react-native-async-storage/async-storage'
var signin = false;
export async function getToken() {
    return await AsyncStorage.getItem('@secret_token');
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
            console.log('login failed');
            return false;
        }

        const data = await response.json();
        signin = true;
        await AsyncStorage.setItem('secret_token', data.token);
        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function getIsSignedIn() {
    return signin;
}

export async function logout() {
    console.log("out");
    await AsyncStorage.clear();
}