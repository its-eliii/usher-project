import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';

const Graph3 = () => {
    const [series, setSeries] = useState([]);  // Store the sales data for the bar chart
    const [categories, setCategories] = useState([]);  // Store the months (labels)

    useEffect(() => {
        Papa.parse('/Data_Practice.csv', {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data.filter(item => item.Month);
                const months = parsedData.map(item => item.Month);
                const furnitureSales = parsedData.map(item => parseInt(item.Furniture) || 0);

                setCategories(months);  // Set the months as categories
                setSeries([{ name: 'Furniture Sales', data: furnitureSales }]);  // Set the sales data as series
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);

    const options = {
        chart: {
            id: 'bar-chart',
            toolbar: {
                show: true,
            },
        },
        xaxis: {
            categories: categories,  // Categories will be months
        },
        title: {
            text: 'Furniture Sales by Month',
            align: 'center',
        },
        legend: {
            position: 'top',
        },
    };

    return (
        <div className="app">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="800"
            />
        </div>
    );
};

export default Graph3;
