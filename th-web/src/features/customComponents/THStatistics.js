import React from "react";
import { useSelector } from 'react-redux';
import { selectAllMeasurements, selectSensors } from '../sensorData/sensorDataSlice';
import { selectAreas } from 'features/areaData/areaDataSlice';

export default function THStatistics() {
    const values = useSelector(selectAllMeasurements);
    const sensors = useSelector(selectSensors);
    const areaItems = useSelector(selectAreas);

    const sensorsObjects = (values && sensors.length > 0 && areaItems.length > 0) ? sensors.map((item, i) => 
        <SensorObject key={i} values={values[item.serial]} sensor={item} area={areaItems.find(area => area.id === item.areaId)} />
    ) : '';


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Sensors summary
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Area
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Temperature
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Humidity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensorsObjects}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function SensorObject(props) {
    let lastItem = "";
    if (props.values && props.values.length > 0) {
        lastItem = props.values[props.values.length - 1];
    }

    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {props.area.name}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {lastItem.temperature}°C
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {lastItem.humidity}%
            </td>
        </tr>
    );
}
