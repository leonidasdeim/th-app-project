import { getAuthToken } from '../utils/LocalStorage'

const API = `http://localhost:8081/`;

export function fetchAreas() {
    const requestOptions = {
        headers: { 'Authorization': getAuthToken() }
    }

    return fetch(API + `area`, requestOptions).then(response => response.json())
}

export function addArea(name) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': getAuthToken() 
        },
        body: JSON.stringify({ name: name })
    }

    return fetch(API + `area`, requestOptions).then(response => response.json())
}

export function deleteArea(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': getAuthToken() 
        },
        body: JSON.stringify({ id: id })
    }

    return fetch(API + `area`, requestOptions).then(response => response)
}
