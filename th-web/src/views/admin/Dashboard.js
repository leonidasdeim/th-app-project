import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectSensors } from 'features/sensorData/sensorDataSlice';
import { removeValues } from 'features/uiData/uiDataSlice';
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

function MainPage() {
    const sensors = useSelector(selectSensors);
    const dispatch = useDispatch();
    dispatch(removeValues());

    return(
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    {
                        sensors.length > 0 && <THStatistics />
                    }
                </div>
            </div>
        </>
    );
}

const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);

function AreaPage() {
    const dispatch = useDispatch();
    dispatch(removeValues());
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