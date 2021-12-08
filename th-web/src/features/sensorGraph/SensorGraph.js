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
    ResponsiveContainer
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
            <div className="px-5 pt-5">
                <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{props.desc}</div>
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-gray-800 mr-2">{lastItem}{props.unit}</div>
                </div>
            </div>

            <ResponsiveContainer width={"100%"} height={400}>
                <AreaChart data={values} margin={{ top: 15, right: 30, left: 0, bottom: 15 }}>
                    <defs>
                        <linearGradient id={props.data} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={props.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={props.color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis axisLine={false} tickLine={false} type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                    <YAxis axisLine={false} tickLine={false} domain={["dataMin - 3", "dataMax + 3"]} />
                    <CartesianGrid />
                    <Tooltip labelFormatter={() => ''} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
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