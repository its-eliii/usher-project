import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';

const Graph2 = () => {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            type: 'donut-chart',
        },
        labels: [],
        title: {
            text: 'Clothing Sales by Month',
            align: 'center',
        },
        legend: {
            position: 'top',
        },
    });

    useEffect(() => {
        Papa.parse('/Data_Practice.csv', {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data.filter(item => item.Month);
                const months = parsedData.map(item => item.Month);
                const clothingSales = parsedData.map(item => parseInt(item.Clothing) || 0);

                setOptions((prevOptions) => ({
                    ...prevOptions,
                    labels: months,
                }));
                setSeries(clothingSales);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);

    return (
        <div className="app">
            <Chart 
            options={options} 
            series={series} 
            type="donut" 
            width="800" 
            />
        </div>
    );
};

export default Graph2;
