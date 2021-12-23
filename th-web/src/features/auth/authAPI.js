import { saveUser, removeUser, getCurrentUser } from '../utils/LocalStorage'

const API = `http://localhost:8081/`;

export function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, password: user.password })
    }

    return fetch(API + `auth/signin`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                saveUser(JSON.stringify(data))
            }
            return data
        });
}

export function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, password: user.password, email: user.email })
    }

    return fetch(API + `auth/signup`, requestOptions).then(response => response.json())
}

export function logout() {
    removeUser()
}

export function getUser() {
    return getCurrentUser()
}
