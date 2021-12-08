import React, { useEffect, useState } from 'react';
import { SensorGraph, SensorGraphArea } from './features/sensorGraph/SensorGraph';
import { fetchMeasurementsAsync } from './features/sensorGraph/sensorGraphSlice';
import { useDispatch } from 'react-redux';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';
import FilterButton from './partials/actions/FilterButton';
import Datepicker from './partials/actions/Datepicker';
import Banner from './partials/Banner';

import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMeasurementsAsync());
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
