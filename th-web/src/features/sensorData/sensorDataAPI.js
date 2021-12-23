const API = `http://localhost:8081/`;

export function fetchMeasurements(sensorId) {
    return fetch(API + `data?serial=${sensorId}&day=0`).then(response => response.json())
}

export function fetchSensors() {
    return fetch(API + `sensor/all`).then(response => response.json())
}
