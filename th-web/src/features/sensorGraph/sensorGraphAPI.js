const API = "https://deimantas.tech/th-api/data?serial=18FE34A3834B&day=0";

export function fetchMeasurements() {
    return fetch(API).then(response => response.json())
}