import React from 'react';
import { useSelector } from 'react-redux';
import { selectMeasurements } from '../sensorData/sensorDataSlice';
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

export function SensorGraph(props) {
    const values = useSelector(state => selectMeasurements(state, props.sensorId));
    let lastItem = "";
    if (values && values.length > 0) {
        lastItem = values[values.length - 1][props.data];
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                        {props.place}
                    </h6>
                    <h2 className="text-blueGray-700 text-xl font-semibold">
                        {props.desc}
                    </h2>
                </div>
            </div>
        </div>
            <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-300-px">

                    <ResponsiveContainer width={"100%"} height={300}>
                        <AreaChart data={values} margin={{ top: 15, right: 30, left: 30, bottom: 15 }}>
                            <defs>
                                <linearGradient id={props.data} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={props.color} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={props.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis hide={true} axisLine={false} tickLine={false} type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                            <YAxis hide={true} domain={["dataMin - 3", "dataMax + 3"]} />
                            <Tooltip labelFormatter={date => "Time: " + moment(date).format('HH:mm')} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                            <Area
                                type="monotone"
                                dataKey={props.data}
                                stroke={props.color}
                                name={props.desc}
                                unit={props.unit}
                                fillOpacity={1}
                                fill={"url(#" + props.data + ")"}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    );
}

export function SensorGraphDouble(props) {
    const values = useSelector(state => selectMeasurements(state, props.sensorId));

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                            {props.place}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">

                    <ResponsiveContainer width={"100%"} height={350}>
                        <AreaChart data={values} margin={{ top: 15, right: 30, left: 30, bottom: 15 }}>
                            <defs>
                                <linearGradient id={props.data1} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={props.color1} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={props.color1} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id={props.data2} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={props.color2} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={props.color2} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis hide={true} axisLine={false} tickLine={false} type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                            <YAxis yAxisId={props.data1} hide={true} axisLine={false} tickLine={false} domain={["dataMin - 3", "dataMax + 3"]} />
                            <YAxis yAxisId={props.data2} hide={true} axisLine={false} tickLine={false} domain={["dataMin - 3", "dataMax + 3"]} />
                            <Tooltip labelFormatter={date => "Time: " + moment(date).format('HH:mm')} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                            <Legend verticalAlign="top" height={36} />
                            <Area
                                type="monotone"
                                yAxisId={props.data1}
                                dataKey={props.data1}
                                stroke={props.color1}
                                name={props.desc1}
                                unit={props.unit1}
                                fillOpacity={1}
                                fill={"url(#" + props.data1 + ")"}
                            />
                            <Area
                                type="monotone"
                                yAxisId={props.data2}
                                dataKey={props.data2}
                                stroke={props.color2}
                                name={props.desc2}
                                unit={props.unit2}
                                fillOpacity={1}
                                fill={"url(#" + props.data2 + ")"}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    );
}
