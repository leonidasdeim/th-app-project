import { configureStore } from '@reduxjs/toolkit';
import sensorReducer from '../features/sensorGraph/sensorGraphSlice';

export const store = configureStore({
  reducer: {
    sensor: sensorReducer,
  },
});
