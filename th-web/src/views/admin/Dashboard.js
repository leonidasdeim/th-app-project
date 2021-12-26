import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectSensors } from 'features/sensorData/sensorDataSlice';

import { SensorGraphDouble } from "features/customComponents/SensorGraph";
import THStatistics from "features/customComponents/THStatistics";

export default function Dashboard() {
    return (
        <Switch>
            <Route path="/admin/dashboard" exact component={MainPage} />
            <Route path="/admin/area/*" exact component={AreaPage} />
        </Switch>
    );
}

function MainPage(props) {
    return(
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <THStatistics />
                </div>
            </div>
        </>
    );
}

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);

function AreaPage(props) {
    const location = useLocation();
    const sensorsAll = useSelector(selectSensors);
    const sensorsArea = sensorsAll.filter(s => s.areaId === parseInt(getLastItem(location.pathname)));
    const sensorsGrapsObject = sensorsArea ? sensorsArea.map((item, i) => <SensorGraphObject key={i} serial={item.serial} />) : '';

    return(
        <>
            <div className="flex flex-wrap">
                {sensorsGrapsObject}
            </div>
        </>
    );
}

function SensorGraphObject(props) {
    return (
        <div className="w-full xl:w-6/12 px-4">
            <SensorGraphDouble sensorId={props.serial}/>
        </div>
    );
}