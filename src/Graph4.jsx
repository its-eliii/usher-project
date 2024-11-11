import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';

const Graph4 = () => {
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse(`${import.meta.env.BASE_URL}Data_Practice.csv`, {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data.filter(item => item.Month);
                const months = parsedData.map(item => item.Month);
                const groceriesSales = parsedData.map(item => parseInt(item.Groceries) || 0);

                // Update state with categories and series
                setCategories(months);
                setSeries([
                    {
                        name: 'Groceries Sales',
                        data: groceriesSales,
                    },
                ]);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);

    const options = {
        chart: {
            id: 'area-chart',
            toolbar: {
                show: true,
            },
        },
        xaxis: {
            categories: categories,  // Set months as the x-axis labels
        },
        yaxis: {
            title: {
                text: 'Sales Value',
            },
        },
        title: {
            text: 'Groceries Sales by Month',
            align: 'center',
        },
        fill: {
            opacity: 0.6,  // Control the transparency of the area
        },
        stroke: {
            curve: 'smooth', // Smooth line transitions
            width: 2,
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
        type="area" 
        width="800" 
        />
        </div>
    );
};

export default Graph4;
