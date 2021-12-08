import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectMeasurements
} from './sensorGraphSlice';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import moment from 'moment';

export function SensorGraph(props) {
    const values = useSelector(selectMeasurements);
    let lastItem = "";
    if (values.length > 0) {
        lastItem = values[values.length - 1][props.data];
    }

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">{props.place}</h2>
            </header>
            <div className="px-5 pt-5">
                <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{props.desc}</div>
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 mr-2">{lastItem}{props.unit}</div>
                </div>
            </div>

            <ResponsiveContainer width={"100%"} height={250}>
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

    );
}

export function SensorGraphDouble(props) {
    const values = useSelector(selectMeasurements);

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">{props.place}</h2>
            </header>

            <ResponsiveContainer width={"100%"} height={400}>
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
                    <Legend verticalAlign="top" height={36}/>
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

    );
}
