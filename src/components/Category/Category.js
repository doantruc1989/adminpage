import React, { useEffect, useState } from "react";
import axiosAll from "../../other/axiosAll";
import { Pagination, Table, Form, Input, Button, Modal } from "antd";
import { SaveOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      axiosAll.get(`/listcategory`).then((response) => {
        setCategories(
          response.data.map((row) => ({
            id: row.id,
            category: row.category,
            image: row.image,
            parentId: row.parentId,
            path: row.path,
          }))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, categories]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
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
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      width: 80,
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
      title: "Image",
      dataIndex: "image",
      width: "auto",
      responsive: ["xs"],
      responsive: ["sm"],
      responsive: ["md"],
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
      title: "ParentId",
      dataIndex: "parentId",
      ellipsis: true,
      width: 50,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="parentId">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Path",
      dataIndex: "path",
      ellipsis: true,
      width: 80,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="path">
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
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.id);
                form.setFieldsValue({
                  id: record.id,
                  category: record.category,
                  image: record.image,
                  parentId: record.parentId,
                  path: record.path,
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
                  title: "Are you sure to delete this Category record?",
                  okText: "Yes",
                  okType: "danger",
                  onOk: () => {
                    setEditingRow(record.id);
                    try {
                      axiosAll.delete(`/category/${record.id}`);
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
    const updatedDataSource = [...categories];
    setCategories(updatedDataSource);
    setEditingRow(null);
    try {
      axiosAll.post(`/category/${values.id}`, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mb-5 text-xl">Category Table</h1>
      <Button className="login-form-button">
        <Link to="addnewcategory">Add new Category</Link>
      </Button>
      <Form form={form} onFinish={onFinish}>
        <Table
          bordered
          className="mt-5"
          columns={columns}
          dataSource={categories}
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

export default Category;
