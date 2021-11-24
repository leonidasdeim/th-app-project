import React, { useEffect } from 'react';
import { SensorGraph } from './features/sensorGraph/SensorGraph';
import { fetchMeasurementsAsync } from './features/sensorGraph/sensorGraphSlice';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeasurementsAsync());
  });

  return (
    <div className="App">
        <SensorGraph />
    </div>
  );
}

export default App;
