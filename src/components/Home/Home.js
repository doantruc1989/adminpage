import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  UserOutlined,
  ShoppingOutlined,
  HomeOutlined,
  CheckOutlined,
  EditOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Col, Row, Button } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../imgs/logo.png";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const user = localStorage.hasOwnProperty("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(from, { replace: true });
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sidebar"
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <Menu
          className="menu text-lg"
          theme="dark"
          mode="inline"
          onClick={onClick}
          selectedKeys={[current]}
          items={[
            {
              className: "menuItem",
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="">DashBoard</Link>,
            },
            {
              className: "menuItem",
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="user">User Table</Link>,
            },
            {
              className: "menuItem",
              key: "3",
              icon: <ShoppingOutlined />,
              label: <Link to="product">Product Table</Link>,
            },
            {
              className: "menuItem",
              key: "4",
              icon: <DatabaseOutlined />,
              label: <Link to="category">Category Table</Link>,
            },
            {
              className: "menuItem",
              key: "5",
              icon: <CheckOutlined />,
              label: <Link to="order">Order Table</Link>,
            },
            {
              className: "menuItem",
              key: "6",
              icon: <EditOutlined />,
              label: <Link to="blog">Blog Table</Link>,
            },
            {
              className: "menuItem",
              key: "7",
              icon: <BarChartOutlined />,
              label: <Link to="chart">Chart</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="navbar">
            <Row gutter={[24, 24]} className="flex items-baseline text-white">
              <Col span={3}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger text-2xl tex-white",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Col>
              <Col span={21} className="flex items-baseline justify-end">
                <p className="text-lg">Hi, {user.username} </p>
                <Button onClick={handleLogout} className="text-white mx-5">
                  Logout
                </Button>
              </Col>
            </Row>
          </div>
        </Header>

        <Content
          style={{
            margin: "32px 16px",
            padding: 24,
            minHeight: 480,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
