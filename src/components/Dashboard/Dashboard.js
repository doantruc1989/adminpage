import React, { useEffect, useState } from 'react'
import { Col, Row, Card } from 'antd';
import './dashboard.css'
import Chart from '../Chart/Chart';
import axiosAll from '../../other/axiosAll';
import Notification from '../Notification/Notification';


const Dashboard = () => {
    const [sale, setSale] = useState();
    const [revenue, setRevenue] = useState();
    const [orderCount, setOrderCount] = useState();

    useEffect(() => {
        try {
            axiosAll.get('/admin/sales/week')
                .then((response) => {
                    setSale(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDaySale = () => {
        try {
            axiosAll.get('/admin/sales/day')
                .then((response) => {
                    setSale(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleWeekSale = () => {
        try {
            axiosAll.get('/admin/sales/week')
                .then((response) => {
                    setSale(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleMonthSale = () => {
        try {
            axiosAll.get('/admin/sales/month')
                .then((response) => {
                    setSale(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            axiosAll.get('/admin/revenue/week')
                .then((response) => {
                    setRevenue(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDayRevenue = () => {
        try {
            axiosAll.get('/admin/revenue/day')
                .then((response) => {
                    setRevenue(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleWeekRevenue = () => {
        try {
            axiosAll.get('/admin/revenue/week')
                .then((response) => {
                    setRevenue(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleMonthRevenue = () => {
        try {
            axiosAll.get('/admin/revenue/month')
                .then((response) => {
                    setRevenue(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            axiosAll.get('/admin/countorders/7')
                .then((response) => {
                    setOrderCount(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDayCount = () => {
        try {
            axiosAll.get('admin/countorders/1')
                .then((response) => {
                    setOrderCount(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleWeekCount = () => {
        try {
            axiosAll.get('admin/countorders/7')
                .then((response) => {
                    setOrderCount(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleMonthCount = () => {
        try {
            axiosAll.get('admin/countorders/30')
                .then((response) => {
                    setOrderCount(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='dashboard-container'>
            <Row gutter={[24, 24]} className='Cards'>
                <Col span={8} className='parentContainer'>
                    <Card className='CompactCard'>
                        <div className='filter'>
                            <a onClick={handleDaySale}>Day</a>
                            <a onClick={handleWeekSale}>Week</a>
                            <a onClick={handleMonthSale}>Month</a>
                        </div>
                        <div className='CompactCard__content'>
                            <h2>Total Sales</h2>
                            <h5>$ {sale}</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={8} className='parentContainer'>
                    <Card className='CompactCard'>
                        <div className='filter'>
                            <a onClick={handleDayRevenue}>Day</a>
                            <a onClick={handleWeekRevenue}>Week</a>
                            <a onClick={handleMonthRevenue}>Month</a>
                        </div>
                        <div className='CompactCard__content'>
                            <h2>Total Revenue</h2>
                            <h5>$ {revenue}</h5>
                        </div>
                    </Card>
                </Col>
                <Col span={8} className='parentContainer'>
                    <Card className='CompactCard'>
                        <div className='filter'>
                            <a onClick={handleDayCount}>Day</a>
                            <a onClick={handleWeekCount}>Week</a>
                            <a onClick={handleMonthCount}>Month</a>
                        </div>
                        <div className='CompactCard__content'>
                            <h2>Total Order</h2>
                            <h5>{orderCount} orders</h5>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} className='dashboard-content'>
                <Col span={8} className='notification'>
                    <Notification />
                </Col>
                <Col span={15} className='chart'>
                    <Chart />
                </Col>
            </Row>


        </div>
    )
}

export default Dashboard