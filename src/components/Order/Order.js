import React, { useEffect, useState } from "react";
import axiosAll from "../../other/axiosAll";
import { Pagination, Table, Form, Input } from "antd";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      axiosAll.get(`/admin/listorder`).then((response) => {
        setOrder(
          response.data.map((row) => ({
            id: row.id,
            userId: row.userId,
            cartTotal: row.cartTotal,
            revenue: row.revenue,
            orderItems: row.orderItems,
            createdAt: row.createdAt,
          }))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, order]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
      responsive: ["xs"],
      responsive: ["sm"],
      responsive: ["md"],
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="id">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "UserId",
      dataIndex: "userId",
      width: 100,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="userId">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "CartTotal",
      dataIndex: "cartTotal",
      width: 120,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="cartTotal">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      width: 100,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="revenue">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "OrderItems",
      dataIndex: "orderItems",
      ellipsis: true,
      width: "auto",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="orderItems">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      ellipsis: true,
      width: "auto",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="createdAt">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
  ];

  const onChange = (current) => {
    setcurrentPage(current);
  };

  return (
    <div>
      <h1 className="mb-5 text-xl">Order Table</h1>

      <Form>
        <Table
          bordered
          columns={columns}
          dataSource={order}
          pagination={false}
        />
      </Form>

      {/* {products.map((product, index) => (
                <div key={index}>
                    {product.productName}
                </div>
            ))} */}

      <Pagination
        className="pagination"
        responsive={true}
        current={currentPage}
        onChange={onChange}
        total={50}
      />
    </div>
  );
};

export default Order;
