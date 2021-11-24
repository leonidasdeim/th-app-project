const API = "https://deimantas.tech/th-api/data?sensorId=1&day=0";

export function fetchMeasurements() {
    return fetch(API).then(response => response.json())
}