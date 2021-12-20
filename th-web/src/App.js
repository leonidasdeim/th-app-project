import React, { useEffect } from 'react';
import { fetchMeasurementsAsync } from './features/sensorGraph/sensorGraphSlice';
import { useDispatch } from 'react-redux';

import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';
import { focusHandling } from 'cruip-js-toolkit';
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMeasurementsAsync("2CF4321314AC"));
    dispatch(fetchMeasurementsAsync("18FE34A3834B"));
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}


  // return (
  //   <div className="App">
  //     <NavBar />
  //       <SensorGraphArea data={"temperature"} desc={"Temperature"} unit={"°C"} color={"#82ca9d"}/>
  //       <SensorGraphArea data={"humidity"} desc={"Humidity"} unit={"%"} color={"#8884d8"}/>
  //   </div>
  // );

export default App;
