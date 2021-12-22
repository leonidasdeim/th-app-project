import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMeasurements } from './sensorGraphAPI';

const initialState = {
    value: [],
};

export const fetchMeasurementsAsync = createAsyncThunk(
    'sensor/fetchMeasurements',
    async (sensorId) => {
        return fetchMeasurements(sensorId);
    }
);

export const sensorGraphSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeasurementsAsync.fulfilled, (state, action) => {
                state.value = {
                    ...state.value,
                    [action.meta.arg]: action.payload
                }
            });
    },
});

export const selectMeasurements = (state, sensorId) => {
    console.log(state.sensor.value)
    return state.sensor.value[sensorId]
};

export default sensorGraphSlice.reducer;
