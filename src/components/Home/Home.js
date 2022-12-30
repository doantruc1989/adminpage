import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BarChartOutlined,
    UserOutlined,
    ShoppingOutlined,
    HomeOutlined,
    CheckOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Col, Row, Button } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../imgs/logo.png";

const { Header, Sider, Content } = Layout;

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const user = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))) : '';

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate(from, { replace: true });
    }

    return (
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar'>
                <div className="logo">
                    <img src={Logo} alt="logo" />

                </div>
                <Menu
                    className='menu'
                    theme="dark"
                    mode="inline"
                    onClick={onClick}
                    selectedKeys={[current]}
                    items={[
                        {
                            className: 'menuItem',
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to=''>DashBoard</Link>,
                        },
                        {
                            className: 'menuItem',
                            key: '2',
                            icon: <UserOutlined />,
                            label: <Link to='user'>User Table</Link>,
                        },
                        {
                            className: 'menuItem',
                            key: '3',
                            icon: <ShoppingOutlined />,
                            label: <Link to='product'>Product Table</Link>,
                        },
                        {
                            className: 'menuItem',
                            key: '4',
                            icon: <CheckOutlined />,
                            label: <Link to='order'>Order Table</Link>,
                        },
                        {
                            className: 'menuItem',
                            key: '5',
                            icon: <EditOutlined />,
                            label: <Link to='blog'>Blog Table</Link>,
                        },
                        {
                            className: 'menuItem',
                            key: '6',
                            icon: <BarChartOutlined />,
                            label: <Link to='chart'>Chart</Link>,
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
                    <div className='navbar'>
                        <Row gutter={[24, 24]}>
                            <Col span={18}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
                            </Col>
                            <Col span={6} className='navbar__username'>
                                <p>Welcome back, {user.username} </p>
                                <Button onClick={handleLogout}>Logout</Button>
                            </Col>
                        </Row>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '60px 16px',
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
