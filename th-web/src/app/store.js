import { configureStore } from '@reduxjs/toolkit';
import sensorReducer from '../features/sensorData/sensorDataSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    sensor: sensorReducer,
    auth: authReducer,
  },
});
