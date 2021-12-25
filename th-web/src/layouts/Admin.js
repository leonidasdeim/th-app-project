/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeasurementsAsync, selectAllMeasurements, selectSensors } from 'features/sensorData/sensorDataSlice';

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

export default function Admin() {
    const dispatch = useDispatch();
    const sensors = useSelector(selectSensors);
    const measurements = useSelector(selectAllMeasurements);

    useEffect(() => {
        if (sensors !== null && sensors.length > 0) {
            sensors.forEach(sensor => dispatch(fetchMeasurementsAsync(sensor.serial)));
        }
    }, [sensors]);
    
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard} />
                        <Route path="/admin/area/*" exact component={Dashboard} />
                        <Route path="/admin/settings" exact component={Settings} />
                        <Route path="/admin/tables" exact component={Tables} />
                        <Redirect from="/admin" to="/admin/dashboard" />
                    </Switch>
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
