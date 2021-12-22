import React from "react";
import { Route, Switch } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";

export default function App() {
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
