import React from "react";

// import { SensorGraphDouble } from "features/customComponents/SensorGraph";
import THStatistics from "features/customComponents/THStatistics";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <THStatistics />
                </div>
            </div>
            {/* <div className="flex flex-wrap">
                <div className="w-full xl:w-6/12 px-4">
                    <SensorGraphDouble sensorId={"1234567893"}/>
                </div>
            </div> */}
        </>
    );
}
