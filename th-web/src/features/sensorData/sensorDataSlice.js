import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMeasurements, fetchSensors, updateSensor } from './sensorDataAPI';

const initialState = {
    sensors: [],
    data: [],
    error: false
};

export const fetchMeasurementsAsync = createAsyncThunk(
    'sensor/fetchMeasurements',
    async (sensorId) => {
        return fetchMeasurements(sensorId);
    }
);

export const fetchSensorsAsync = createAsyncThunk(
    'sensor/fetchSensors',
    async () => {
        return fetchSensors();
    }
);

export const updateSensorAsync = createAsyncThunk(
    'sensor/updateSensor',
    async (data) => {
        return updateSensor(data);
    }
);

export const sensorGraphSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
        resetSensorsError(state) {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeasurementsAsync.fulfilled, (state, action) => {
                state.data = {
                    ...state.data,
                    [action.meta.arg]: action.payload
                };
            })
            .addCase(fetchSensorsAsync.fulfilled, (state, action) => {
                state.sensors = action.payload;
            })
            .addCase(updateSensorAsync.fulfilled, (state, action) => {
                state.sensors = state.sensors.map(item => item.serial !== action.payload.serial ? item : action.payload);
            })
            .addCase(fetchSensorsAsync.rejected, (state) => {
                state.error = true;
            })
            .addCase(fetchMeasurementsAsync.rejected, (state) => {
                state.error = true;
            })
            .addCase(updateSensorAsync.rejected, (state) => {
                console.log("fail");
                // state.error = true;
            });
    },
});

export const { resetSensorsError } = sensorGraphSlice.actions;

export const selectMeasurements = (state, sensorId) => state.sensor.data[sensorId];
export const selectAllMeasurements = (state) => state.sensor.data;
export const selectSensors = (state) => state.sensor.sensors;
export const selectSensorsError = (state) => state.sensor.error;

export default sensorGraphSlice.reducer;
