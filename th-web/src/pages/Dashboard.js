import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
//import WelcomeBanner from '../partials/WelcomeBanner';
import { SensorGraph } from '../features/sensorGraph/SensorGraph';

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* <WelcomeBanner text={"Darbo kamabrys"}/> */}

                        <div className="grid grid-cols-12 gap-6">

                            <SensorGraph data={"temperature"} desc={"Temperature"} unit={"°C"} color={"#82ca9d"} />
                            <SensorGraph data={"humidity"} desc={"Humidity"} unit={"%"} color={"#8884d8"} />

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;