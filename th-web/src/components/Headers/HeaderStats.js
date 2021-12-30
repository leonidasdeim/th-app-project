import React from "react";
import { useSelector } from 'react-redux';
import { selectValues, selectDoShow } from 'features/uiData/uiDataSlice';

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
    const values = useSelector(selectValues);
    const doShow = useSelector(selectDoShow);

    const cardObjects = (doShow && values) ? values.map((item, i) => 
        <CardObject key={i} values={item} />
    ) : '';

    return (
        <>
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">
                            {cardObjects}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function CardObject(props) {
    return (
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
                statSubtitle={props.values.name}
                statTitle={String(props.values.value) + props.values.unit}
                statIconName={"fas " + props.values.icon}
                statIconColor={props.values.color}
            />
        </div>
    );
}
