import { configureStore } from '@reduxjs/toolkit';
import sensorReducer from '../features/sensorData/sensorDataSlice';
import areaReducer from '../features/areaData/areaDataSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        sensor: sensorReducer,
        area: areaReducer,
        auth: authReducer,
    },
});
