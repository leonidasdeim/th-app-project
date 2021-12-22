import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import { store } from './app/store';
import { Provider } from 'react-redux';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import App from "App.js";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/th">
        <Switch>
            <Route path="*" component={App} />
            <Redirect from="*" to="/" />
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
