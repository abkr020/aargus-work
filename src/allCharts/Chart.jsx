import React, { useEffect } from 'react';
import {
    getUniqueStatuses,
    countStatusOccurrences,
    formatStatusCounts
} from './ChartCalc'; // adjust path if needed

const Chart = ({data}) => {
    useEffect(() => {

        const uniqueStatuses = getUniqueStatuses(data);
        const statusCounts = countStatusOccurrences(data, uniqueStatuses);
        const formattedData = formatStatusCounts(statusCounts);

        console.log('Unique Statuses:', uniqueStatuses);
        console.log('Status Counts:', statusCounts);
        console.log('Formatted Data:', formattedData);
    }, []);

    return <div></div>;
};

export default Chart;
