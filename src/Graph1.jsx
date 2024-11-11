import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';

const Graph1 = () => {
    const [series, setSeries] = useState([
        { name: 'Electronics', data: [] },
    ]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Papa.parse(`${import.meta.env.BASE_URL}Data_Practice.csv`, {
            download: true,
            header: true,
            complete: (results) => {
                const parsedData = results.data.filter(item => item.Month);
                const months = parsedData.map(item => item.Month);
                const electronics = parsedData.map(item => Number(item.Electronics) || 0);
                

                // Debugging to see if data is correct
                console.log("Months:", months);
                console.log("Electronics:", electronics);
                
    
                setCategories(months);
                setSeries([
                    { name: 'Electronics', data: electronics },
                ]);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);
    

    const options = {
        chart: {
            id: 'line-chart',
            toolbar: {
                show: true,
            },
        },
        xaxis: {
            categories: categories.length > 0 ? categories : [], // Ensure categories are valid
        },
        title: {
            text: 'Electronic Sales by Month',
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
                type="line"
                width="800"
            />
        </div>
    );
};

export default Graph1;
