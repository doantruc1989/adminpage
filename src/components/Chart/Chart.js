import React, { useState, useEffect } from 'react';
// import { DualAxes } from '@ant-design/plots';
import axiosAll from '../../other/axiosAll';

const Chart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        try {
            axiosAll.get(`/admin/chart/month`)
                .then(
                    (response => {
                        setData(response.data)
                    }))
        } catch (error) {
            console.log(error)
        }
    };

    const handleClick = () => {
        try {
            axiosAll.get(`/admin/chart/week`)
                .then(
                    (response => {
                        setData(response.data)
                    }))
        } catch (error) {
            console.log(error)
        }
    }

    console.log(data)
    const config = {
        data: [data, data],
        xField: 'date',
        yField: ['revenue', 'sale'],
        // geometryOptions: [
        //     {
        //         geometry: 'line',
        //         smooth: false,
        //         color: '#5B8FF9',
        //         label: {
        //             formatter: (datum) => {
        //                 return `${datum.value}个`;
        //             },
        //         },
        //         lineStyle: {
        //             lineWidth: 3,
        //             lineDash: [5, 5],
        //         },
        //     },
        //     {
        //         geometry: 'line',
        //         smooth: true,
        //         color: '#5AD8A6',
        //         lineStyle: {
        //             lineWidth: 4,
        //             opacity: 0.5,
        //         },
        //         label: {
        //             formatter: (datum) => {
        //                 return `${datum.count}个`;
        //             },
        //         },
        //         point: {
        //             shape: 'circle',
        //             size: 4,
        //             style: {
        //                 opacity: 0.5,
        //                 stroke: '#5AD8A6',
        //                 fill: '#fff',
        //             },
        //         },
        //     },
        // ],
    };

    return (
        <div className='chart-container'>
            <h1> Chart</h1>
            <button onClick={handleClick}>Week</button>
            <button onClick={asyncFetch}>Month</button>
            {/* <DualAxes {...config} /> */}
        </div>
    );
}

export default Chart