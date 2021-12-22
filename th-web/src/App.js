import React, { useEffect } from 'react';
import { fetchMeasurementsAsync } from 'features/sensorGraph/sensorGraphSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectMeasurements
} from 'features/sensorGraph/sensorGraphSlice';

import { Route, Switch } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

export default function App() {
    const dispatch = useDispatch();
    // const values = useSelector(state => selectMeasurements(state, "2CF4321314AC"));
    // console.log(values)
  
    useEffect(() => {
      dispatch(fetchMeasurementsAsync("2CF4321314AC"));
      dispatch(fetchMeasurementsAsync("2CF432131350"));
      console.log("TEST")
    });
    // const history = useHistory()

    // useEffect(() => {
    //     history.push('/auth/login')
    //   });

    return (
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Landing} />
        </Switch>
    );
}
