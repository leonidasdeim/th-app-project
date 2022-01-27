import React, { useState } from "react";
import { createPopper } from "@popperjs/core";

import { useSelector, useDispatch } from 'react-redux';
import { selectAreas, addAreaAsync, deleteAreaAsync } from 'features/areaData/areaDataSlice';
import { selectSensors, updateSensorAsync } from 'features/sensorData/sensorDataSlice';


// components

export default function MainSettings() {
    const [areaEditEnabled, setAreaEdit] = useState(false);
    const [newArea, setNewArea] = useState("");
    const dispatch = useDispatch();

    const areaItems = useSelector(selectAreas);
    const areaObjects = (areaItems.length > 0) ? areaItems.map((item, i) =>
        <AreaObject key={i} item={item} edit={areaEditEnabled} />
    ) : null;

    const sensorItems = useSelector(selectSensors);
    const deviceObjects = (sensorItems.length > 0) ? sensorItems.map((item, i) =>
        <DeviceObject key={i} item={item} areas={areaItems} />
    ) : null;


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Devices</h6>
                        {/* <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add
                        </button> */}
                    </div>
                </div>
                <div className="flex-auto px-0 py-0 overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Serial
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Area
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {deviceObjects}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold pr-4">Areas</h6>
                        {
                            !areaEditEnabled &&
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setAreaEdit(true)}
                            >
                                Edit
                            </button>
                        }
                        {
                            areaEditEnabled &&
                            <div className="flex flex-row-reverse">
                                <input
                                    type="text"
                                    className="border-0 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xs shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={newArea} onChange={evt => setNewArea(evt.target.value)}
                                />
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        dispatch(addAreaAsync(newArea));
                                        setNewArea("");
                                    }}
                                >
                                    Add
                                </button>
                                <button
                                    className="bg-blueGray-200 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setAreaEdit(false)}
                                >
                                    <i className="fas text-black fa-arrow-right"></i>
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-4 py-4">
                    <div className="flex flex-wrap">
                        {areaObjects ? areaObjects : ":< nothing here"}
                    </div>
                </div>
            </div>
        </>
    );
}

function AreaObject(props) {
    const dispatch = useDispatch();

    return (
        <div className="w-full lg:w-4/12 px-2">
            <div className="text-blueGray-100 bg-blueGray-500 rounded text-sm font-semibold shadow m-2 p-2 pl-4 text-center flex justify-between">
                {props.item.name}
                {
                    props.edit &&
                    <i className="text-sm text-red-500 far fa-trash-alt pr-2" onClick={() => dispatch(deleteAreaAsync(props.item.id))}></i>
                }
            </div>
        </div>
    );
}

function DeviceObject(props) {
    return (
        <tr className="bg-white">
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs truncate max-w-100-px p-4 text-left">
                {props.item.serial ? props.item.serial : "null"}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {props.item.name ? props.item.name : "null"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <SensorDropdown areas={props.areas} item={props.item} />
            </td>
        </tr>
    );
}

function SensorDropdown(props) {
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const dropdownObjects = (props.areas.length > 0) ? props.areas.map((item, i) =>
        <DropdownObject key={i} area={item} item={props.item} close={setDropdownPopoverShow} />
    ) : null;

    const currentArea = props.areas.find(area => area.id === props.item.areaId);

    return (
        <>
            <a href="#blank"
                ref={btnDropdownRef}
                className="text-blueGray-100 bg-lightBlue-500 rounded text-xs py-1 px-2 font-semibold shadow text-center flex justify-between max-w-180-px"
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                {currentArea ? currentArea.name : "Not assigned"}
                <i className="far fa-edit pl-2"></i>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                {dropdownObjects}
                { currentArea &&
                    <>
                        <div className="h-0 my-2 border border-solid border-blueGray-100" />
                        <DropdownObject area={{name: "Remove", id: null}} item={props.item} close={setDropdownPopoverShow} />
                    </>
                }
            </div>
        </>
    );
};

function DropdownObject(props) {
    const dispatch = useDispatch();
    const handleUpdateButton = (event) => {
        props.close(false);
        dispatch(updateSensorAsync({name: props.item.name, serial: props.item.serial, areaId: props.area.id}));
    }
    return (
        <a
            href="#blank"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            onClick={(e) => handleUpdateButton(e)}
        >
            {props.area.name}
        </a>
    );
}
