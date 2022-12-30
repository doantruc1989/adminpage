import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import axiosAll from '../../other/axiosAll';

const Notification = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosAll.get('/lowquantity')
            .then((response) => {
                setData([...data, ...response.data]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className='notification-content'>
            <h1>Notification</h1>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                style={{ display: 'flex', alignItems: 'center' }}
                                avatar={<Avatar src={item.image} />}
                                title={item.productName}
                                description={<div>is running out.<strong>{item.quantity}</strong> left</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default Notification;