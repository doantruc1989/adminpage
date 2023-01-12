import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import axiosAll from "../../other/axiosAll";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosAll
      .get("/lowquantity")
      .then((response) => {
        setData([...data, ...response.data]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="notification-content ">
      <h1>Notification</h1>
      <div
        id="scrollableDiv"
        className="bg-purple border-purple-500 bg-opacity-50 shadow-2xl"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",

          borderRadius: "20px",
        }}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                avatar={<Avatar src={item.image} />}
                title={item.productName}
                description={
                  <div className="text-base">
                    is running out.<strong>{item.quantity}</strong> left
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default Notification;
