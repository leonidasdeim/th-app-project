import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectMeasurements
} from './sensorGraphSlice';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer
  } from "recharts";
  import moment from 'moment';

export function SensorGraph(props) {
    const values = useSelector(selectMeasurements);
    console.log(values)

    return (
        <div>
            <ResponsiveContainer width={"100%"} height={400}>
                <LineChart
                    data={values}
                    margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                >
                <CartesianGrid />
                <XAxis type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                <YAxis domain={["dataMin - 3", "dataMax + 3"]}>
                    <Label
                        value={props.desc + ", " + props.unit}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={() => ''} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                <Line
                    stroke={props.color}
                    dataKey={props.data}
                    name={props.desc}
                    unit={props.unit}
                    dot={false}
                    type={"monotone"}
                    strokeWidth={3}
                />
                </LineChart>    
            </ResponsiveContainer>
        </div>
    );
}

export function SensorGraphArea(props) {
    const values = useSelector(selectMeasurements);
    console.log(values)

    return (
        <div>
            <ResponsiveContainer width={"100%"} height={400}>
                <AreaChart data={values}
                    margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                >
                    <defs>
                        <linearGradient id={props.data}  x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={props.color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={props.color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                    <YAxis domain={["dataMin - 3", "dataMax + 3"]}>
                        <Label
                            value={props.desc + ", " + props.unit}
                            position="left"
                            angle={-90}
                            style={{ textAnchor: "middle" }}
                        />
                    </YAxis>
                    <CartesianGrid  />
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

export function SensorGraphArea2(props) {
    const values = useSelector(selectMeasurements);
    console.log(values)

    return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex items-center">
            <h2 className="font-semibold text-gray-800">{props.desc}</h2>
        </header>
        <ResponsiveContainer width={"100%"} height={400}>
            <AreaChart data={values} margin={{ top: 15, right: 30, left: 0, bottom: 15 }}>
                <defs>
                    <linearGradient id={props.data}  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={props.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={props.color} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />
                <YAxis domain={["dataMin - 3", "dataMax + 3"]} />
                <CartesianGrid  />
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