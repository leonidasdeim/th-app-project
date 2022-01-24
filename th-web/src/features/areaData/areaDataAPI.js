import { getAuthToken } from '../utils/LocalStorage'
import { getAPI } from '../api'

export function fetchAreas() {
    const requestOptions = {
        headers: { 'Authorization': getAuthToken() }
    }

    return fetch(getAPI() + `area`, requestOptions).then(response => response.json())
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

    return fetch(getAPI() + `area`, requestOptions).then(response => response.json())
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

    return fetch(getAPI() + `area`, requestOptions).then(response => response.json())
}
