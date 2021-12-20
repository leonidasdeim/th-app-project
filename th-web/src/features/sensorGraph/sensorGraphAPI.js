const API = `https://deimantas.tech/th-api/`;

export function fetchMeasurements(sensorId) {
    return fetch(API + `data?serial=${sensorId}&day=0`).then(response => response.json())
}