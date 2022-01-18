import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAreas, addAreaAsync, deleteAreaAsync } from 'features/areaData/areaDataSlice';

// components

export default function MainSettings() {
    const [areaEditEnabled, setAreaEdit] = useState(false);
    const [newArea, setNewArea] = useState("");

    const dispatch = useDispatch();
    const areaItems = useSelector(selectAreas);
    const areaObjects = (areaItems.length > 0) ? areaItems.map((item, i) =>
        <AreaObject key={i} item={item} edit={areaEditEnabled} />
    ) : null;

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Devices</h6>
                        <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-4">

                </div>
            </div>

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Areas</h6>
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
                                    defaultValue=""
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
                                    className="bg-blueGray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setAreaEdit(false)}
                                >
                                    Edit
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
