/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, checkForUser, logoutUser } from 'features/auth/authSlice';
import { selectError } from 'features/sensorData/sensorDataSlice';
import { fetchSensorsAsync } from 'features/sensorData/sensorDataSlice';
import { Route, Switch, useHistory } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

export default function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const apiError = useSelector(selectError);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/admin/dashboard')
            dispatch(fetchSensorsAsync());
        } else history.push('/');
    }, [isLoggedIn])

    useEffect(() => {
        if (apiError) dispatch(logoutUser());
    }, [apiError])

    useEffect(() => {
        dispatch(checkForUser());
    });

    return (
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Landing} />
        </Switch>
    );
}
