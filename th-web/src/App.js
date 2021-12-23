/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, checkForUser } from 'features/auth/authSlice';
import { Route, Switch, useHistory } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

export default function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/admin/dashboard')
        } else {
            history.push('/');
        }
    }, [isLoggedIn])

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
