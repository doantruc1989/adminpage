import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "antd";
import "./dashboard.css";
import Chart from "../Chart/Chart";
import axiosAll from "../../other/axiosAll";
import Notification from "../Notification/Notification";

const Dashboard = () => {
  const [sale, setSale] = useState();
  const [revenue, setRevenue] = useState();
  const [orderCount, setOrderCount] = useState();

  useEffect(() => {
    try {
      axiosAll.get("/admin/sales/week").then((response) => {
        setSale(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDaySale = () => {
    try {
      axiosAll.get("/admin/sales/day").then((response) => {
        setSale(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekSale = () => {
    try {
      axiosAll.get("/admin/sales/week").then((response) => {
        setSale(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthSale = () => {
    try {
      axiosAll.get("/admin/sales/month").then((response) => {
        setSale(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axiosAll.get("/admin/revenue/week").then((response) => {
        setRevenue(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDayRevenue = () => {
    try {
      axiosAll.get("/admin/revenue/day").then((response) => {
        setRevenue(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleWeekRevenue = () => {
    try {
      axiosAll.get("/admin/revenue/week").then((response) => {
        setRevenue(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleMonthRevenue = () => {
    try {
      axiosAll.get("/admin/revenue/month").then((response) => {
        setRevenue(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axiosAll.get("/admin/countorders/7").then((response) => {
        setOrderCount(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDayCount = () => {
    try {
      axiosAll.get("admin/countorders/1").then((response) => {
        setOrderCount(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekCount = () => {
    try {
      axiosAll.get("admin/countorders/7").then((response) => {
        setOrderCount(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthCount = () => {
    try {
      axiosAll.get("admin/countorders/30").then((response) => {
        setOrderCount(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row
        gutter={[24, 24]}
        className="flex items-center flex-col md:flex-row justify-center"
      >
        <Col span={8} className="min-w-full md:min-w-fit  mx-0">
          <Card className="w-full border border-blue-500 border-solid rounded-2xl bg-blue-400 bg-blue bg-opacity-60 shadow-2xl">
            <div className="flex items-center justify-end">
              <a onClick={handleDaySale} className="mx-1 text-lg">
                Day
              </a>
              <a onClick={handleWeekSale} className="mx-1 text-lg">
                Week
              </a>
              <a onClick={handleMonthSale} className="mx-1 text-lg">
                Month
              </a>
            </div>
            <div className="w-full ">
              <h2 className="text-lg font-sans">Total Sales</h2>
              <h5 className="text-2xl font-sans">$ {sale}</h5>
            </div>
          </Card>
        </Col>
        <Col span={8} className="min-w-full md:min-w-fit  mx-0">
          <Card className="w-full border border-pink-500 border-solid rounded-2xl bg-pink bg-opacity-70  shadow-2xl">
            <div className="flex items-center justify-end">
              <a onClick={handleDayRevenue} className="mx-1 text-lg">
                Day
              </a>
              <a onClick={handleWeekRevenue} className="mx-1 text-lg">
                Week
              </a>
              <a onClick={handleMonthRevenue} className="mx-1 text-lg">
                Month
              </a>
            </div>
            <div className="w-full ">
              <h2 className="text-lg font-sans">Total Revenue</h2>
              <h5 className="text-2xl font-sans">$ {revenue}</h5>
            </div>
          </Card>
        </Col>
        <Col span={8} className="min-w-full md:min-w-fit  mx-0">
          <Card className="w-full border border-yellow-500 border-solid rounded-2xl shadow-2xl bg-yellow bg-opacity-60">
            <div className="flex items-center justify-end">
              <a onClick={handleDayCount} className="mx-1 text-lg">
                Day
              </a>
              <a onClick={handleWeekCount} className="mx-1 text-lg">
                Week
              </a>
              <a onClick={handleMonthCount} className="mx-1 text-lg">
                Month
              </a>
            </div>
            <div className="w-full ">
              <h2 className="text-lg font-sans">Total Order</h2>
              <h5 className="text-2xl font-sans">{orderCount} orders</h5>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="flex flex-col md:flex-row my-5">
        <Col span={8} className="min-w-full md:min-w-fit ">
          <Notification />
        </Col>
        <Col span={16} className="chart">
          <Chart />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
