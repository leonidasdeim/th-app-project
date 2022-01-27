import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSensorsAsync } from 'features/sensorData/sensorDataSlice';
import { selectAllMeasurements, selectSensors } from '../sensorData/sensorDataSlice';
import { selectAreas } from 'features/areaData/areaDataSlice';

export default function THStatistics() {
    const dispatch = useDispatch();
    const values = useSelector(selectAllMeasurements);
    const sensors = useSelector(selectSensors);
    const areaItems = useSelector(selectAreas);

    const sensorsObjects = (values && sensors.length > 0 && areaItems.length > 0) ? sensors.map((item, i) => 
        <SensorObject key={i} values={values[item.serial]} sensor={item} area={areaItems.find(area => area.id === item.areaId)} />
    ) : '';


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Summary</h6>
                        <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => dispatch(fetchSensorsAsync())}
                        >
                            <i className="fas fa-sync-alt text-xs"></i>
                        </button>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Sensors
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    
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
    const status = ((lastItem.time + 900000) > new Date().getTime());

    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"> 
                { !status && <i className="fas fa-dot-circle pr-2 text-red-500"></i> }
                { status && <i className="far fa-dot-circle pr-2 text-green-500"></i> }
                {props.area ? props.area.name : "not assigned"}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {lastItem.temperature ? lastItem.temperature + "°C" : "no data"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {lastItem.humidity ? lastItem.humidity + "%" : "no data"}
            </td>
        </tr>
    );
}
