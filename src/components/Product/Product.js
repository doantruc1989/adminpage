import React, { useEffect, useState } from "react";
import axiosAll from "../../other/axiosAll";
import {
  Pagination,
  Table,
  Form,
  Input,
  Button,
  Modal,
  AutoComplete,
} from "antd";
import { SaveOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      axiosAll.get(`/product?page=${currentPage}`).then((response) => {
        setProducts(
          response.data.map((row) => ({
            id: row.id,
            productName: row.productName,
            price: row.price,
            initialPrice: row.initialPrice,
            quantity: row.quantity,
            content: row.content,
            image: row.image,
            category: row.category,
          }))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, products]);

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
      title: "ProductName",
      dataIndex: "productName",
      width: "auto",
      //   textWrap: "word-break",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="productName">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="price">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "InitialPrice",
      dataIndex: "initialPrice",
      ellipsis: true,
      width: 60,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="initialPrice">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      ellipsis: true,
      width: 60,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="quantity">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Content",
      dataIndex: "content",
      ellipsis: true,
      width: "auto",
      responsive: ["sm"],
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="content">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      ellipsis: true,
      width: 100,
      responsive: ["sm"],
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="image">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 120,
      responsive: ["sm"],
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="category">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Action",
      width: "auto",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.id);
                form.setFieldsValue({
                  id: record.id,
                  productName: record.productName,
                  initialPrice: record.initialPrice,
                  price: record.price,
                  quantity: record.quantity,
                  image: record.image,
                  category: record.category,
                });
              }}
            >
              <EditOutlined style={{ fontSize: "20px" }} />
            </Button>
            <Button type="link" htmlType="submit">
              <SaveOutlined style={{ fontSize: "20px" }} />
            </Button>
            <Button
              type="link"
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure to delete this product record?",
                  okText: "Yes",
                  okType: "danger",
                  onOk: () => {
                    setEditingRow(record.id);
                    try {
                      axiosAll.delete(`/product/${record.id}`);
                    } catch (error) {
                      console.log(error);
                    }
                  },
                });
              }}
            >
              <DeleteOutlined style={{ fontSize: "20px" }} />
            </Button>
          </>
        );
      },
    },
  ];

  const onChange = (current) => {
    setcurrentPage(current);
  };

  const onFinish = (values) => {
    const updatedDataSource = [...products];
    setProducts(updatedDataSource);
    setEditingRow(null);
    try {
      axiosAll.post(`/product/${values.id}`, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-xl">Product Table</h1>
      <Button className="login-form-button">
        <Link to="addnewProduct">Add new Product</Link>
      </Button>
      <Form form={form} onFinish={onFinish}>
        <Table
          bordered
          columns={columns}
          className="mt-5"
          dataSource={products}
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

export default Product;
