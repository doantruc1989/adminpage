import React, { useEffect, useState } from 'react'
import axiosAll from '../../other/axiosAll';
import { Pagination, Table, Form, Input, Button, Modal, } from 'antd';
import { SaveOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const Blog = () => {
    const [order, setOrder] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        try {
            axiosAll.get(`/blog`)
                .then((response => {
                    setOrder(response.data.map(row => ({
                        id: row.id,
                        image: row.image,
                        title: row.title,
                        content: row.content,
                        littlecontent: row.littlecontent,
                        createdAt: row.createdAt,
                    })))
                }));
        } catch (error) {
            console.log(error)
        }
    }, [currentPage, order])

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            width: 50,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="id"
                        >
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
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="image"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 120,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="title"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },

        },
        {
            title: 'Content',
            dataIndex: 'content',
            ellipsis: true,
            width: 100,
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="content"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'Littlecontent',
            dataIndex: 'littlecontent',
            ellipsis: true,
            width: 'auto',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="littlecontent"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            ellipsis: true,
            width: 'auto',
            render: (text, record) => {
                if (editingRow === record.id) {
                    return (
                        <Form.Item
                            name="createdAt"
                        >
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{text}</p>;
                }
            },
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <>
                        <Button
                            type="link"
                            onClick={() => {
                                setEditingRow(record.id);
                                form.setFieldsValue({
                                    id: record.id,
                                    image: record.image,
                                    title: record.title,
                                    content: record.content,
                                    littlecontent: record.littlecontent,
                                    createdAt: record.createdAt,
                                });
                            }}
                        >
                            <EditOutlined style={{ fontSize: '20px' }} />
                        </Button>
                        <Button type="link" htmlType="submit">
                            <SaveOutlined style={{ fontSize: '20px' }} />
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                Modal.confirm({
                                    title: "Are you sure to delete this blog record?",
                                    okText: "Yes",
                                    okType: "danger",
                                    onOk: () => {
                                        setEditingRow(record.id)
                                        try {
                                            axiosAll.delete(`/blog/delete/${record.id}`)
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    },
                                });
                            }}
                        >
                            <DeleteOutlined style={{ fontSize: '20px' }} />
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
        const updatedDataSource = [...order];
        setOrder(updatedDataSource);
        setEditingRow(null);
        try {
            axiosAll.put(`/blog/edit/${values.id}`,
                values,
            );
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <h1>Blog Table</h1>
            <Button><Link to='addnewblog'>Add new Blog</Link></Button>
            <Form form={form} onFinish={onFinish}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={order}
                    pagination={false} />
            </Form>

            {/* {products.map((product, index) => (
                <div key={index}>
                    {product.productName}
                </div>
            ))} */}

            <Pagination
                className='pagination'
                responsive={true}
                current={currentPage}
                onChange={onChange}
                total={50} />
        </div>
    )
}

export default Blog