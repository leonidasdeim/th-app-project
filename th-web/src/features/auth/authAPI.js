import { saveUser, removeUser, getCurrentUser } from '../utils/LocalStorage'
import { getAPI } from '../api'

export function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, password: user.password })
    }

    return fetch(getAPI() + `auth/signin`, requestOptions)
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

    return fetch(getAPI() + `auth/signup`, requestOptions).then(response => response)
}

export function logout() {
    removeUser()
}

export function getUser() {
    return getCurrentUser()
}
