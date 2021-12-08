import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMeasurements } from './sensorGraphAPI';

const initialState = {
    value: [],
};

export const fetchMeasurementsAsync = createAsyncThunk(
    'sensor/fetchMeasurements',
    async () => {
        return fetchMeasurements();
    }
);

export const sensorGraphSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeasurementsAsync.fulfilled, (state, action) => {
                state.value = action.payload;
            });
    },
});

export const selectMeasurements = (state) => state.sensor.value;

export default sensorGraphSlice.reducer;
