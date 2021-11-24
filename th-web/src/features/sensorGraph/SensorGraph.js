import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectMeasurements
} from './sensorGraphSlice';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer
  } from "recharts";
  import moment from 'moment';

export function SensorGraph() {
    const values = useSelector(selectMeasurements);

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
                        value={"Temperature (°C)"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={() => ''} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                <Line
                    stroke="#82ca9d"
                    dataKey="temperature"
                    name="Temperature"
                    unit={"°C"}
                    dot={false}
                    type={"natural"}
                />
                </LineChart>    
            </ResponsiveContainer>

            <ResponsiveContainer width={"100%"} height={400}>
                <LineChart
                    data={values}
                    margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                >
                <CartesianGrid />
                <XAxis type="number" dataKey="time" domain={["dataMin", "dataMax"]} tickFormatter={date => moment(date).format('HH:mm')} />

                <YAxis domain={["dataMin - 5", "dataMax + 5"]}>
                    <Label
                        value={"Humidity (%)"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={() => ''} formatter={(okay) => [new Intl.NumberFormat('en').format(okay), undefined]} />
                <Line
                    stroke="#8884d8"
                    dataKey="humidity"
                    name="Humidity"
                    unit={"%"}
                    dot={false}
                    type={"natural"}
                />
                </LineChart>    
            </ResponsiveContainer>
        </div>
    );
}
