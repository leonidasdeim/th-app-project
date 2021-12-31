import React from "react";

// components

import CardSettings from "components/Cards/CardSettings";
import MainSettings from "components/Cards/MainSettings";

export default function Settings() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <MainSettings />
                </div>
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings />
                </div>
            </div>
        </>
    );
}
