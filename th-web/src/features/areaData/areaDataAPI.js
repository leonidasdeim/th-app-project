import { getAuthToken } from '../utils/LocalStorage'

const API = `http://localhost:8081/`;

export function fetchAreas() {
    const requestOptions = {
        headers: { 'Authorization': getAuthToken() }
    }

    return fetch(API + `area`, requestOptions).then(response => response.json())
}
