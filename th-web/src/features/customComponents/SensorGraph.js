/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMeasurements } from '../sensorData/sensorDataSlice';
import { addValue, removeValues } from 'features/uiData/uiDataSlice';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import moment from 'moment';

export function SensorGraphDouble(props) {
    const dispatch = useDispatch();
    const values = useSelector(state => selectMeasurements(state, props.sensorId));
    const c = {
        data1: "temperature",
        desc1: "Temperature", 
        unit1: "°C",
        color1: "#82ca9d",
        data2: "humidity", 
        desc2: "Humidity", 
        unit2: "%",
        color2: "#8884d8"
    };

    useEffect(() => {
        dispatch(removeValues());
        if (values && values.length > 0) {
            dispatch(addValue({
                name: c.desc1,
                unit: c.unit1,
                value: values[values.length - 1][c.data1],
                icon: "fa-thermometer-half",
                color: "bg-yellow-500"
            }));
            dispatch(addValue({
                name: c.desc2,
                unit: c.unit2,
                value: values[values.length - 1][c.data2],
                icon: "fa-tint",
                color: "bg-lightBlue-500"
            }));
        }
    }, [props])

    useLayoutEffect(() => {
        return () => {
            dispatch(removeValues());
        }
    }, [])

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                            
                        </h6>
                    </div>
                </div>
            </div>
            <div className="flex-auto">
                {/* Chart */}
                <div className="relative h-300-px">

                    <ResponsiveContainer width={"100%"} height={300}>
                        <AreaChart data={values} margin={{ top: 15, right: 0, left: 0, bottom: 15 }}>
                            <defs>
                                <linearGradient id={c.data1} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={c.color1} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={c.color1} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id={c.data2} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={c.color2} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={c.color2} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis hide={true} axisLine={false} tickLine={false} type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                            <YAxis yAxisId={c.data1} hide={true} axisLine={false} tickLine={false} domain={["dataMin - 3", "dataMax + 3"]} />
                            <YAxis yAxisId={c.data2} hide={true} axisLine={false} tickLine={false} domain={["dataMin - 3", "dataMax + 3"]} />
                            <Tooltip labelFormatter={date => "Time: " + moment(date).format('HH:mm')} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                            <Legend verticalAlign="top" height={36} />
                            <Area
                                type="monotone"
                                yAxisId={c.data1}
                                dataKey={c.data1}
                                stroke={c.color1}
                                name={c.desc1}
                                unit={c.unit1}
                                fillOpacity={1}
                                fill={"url(#" + c.data1 + ")"}
                            />
                            <Area
                                type="monotone"
                                yAxisId={c.data2}
                                dataKey={c.data2}
                                stroke={c.color2}
                                name={c.desc2}
                                unit={c.unit2}
                                fillOpacity={1}
                                fill={"url(#" + c.data2 + ")"}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    );
}
