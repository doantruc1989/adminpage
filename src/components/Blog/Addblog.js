import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axiosAll from "../../other/axiosAll";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState();
  const [littlecontent, setLittlecontent] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/blog";

  const onFinish = () => {
    try {
      axiosAll.post(
        `/blog/createnewblog`,
        JSON.stringify({
          title,
          littlecontent,
          content,
          image,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="blog">back to Blog Table</Link>
          </p>
        </section>
      ) : (
        <section className="flex items-center flex-col">
          <h1 className="mb-5 text-xl">Add new Blog</h1>
          <Form
            name="normal_login"
            className="w-full md:w-1/2"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item name="title">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </Form.Item>
            <Form.Item name="littlecontent">
              <Input
                value={littlecontent}
                onChange={(e) => setLittlecontent(e.target.value)}
                placeholder="littlecontent"
              />
            </Form.Item>
            <Form.Item name="content">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="content"
              />
            </Form.Item>
            <Form.Item name="image">
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="image"
              />
            </Form.Item>
            <Form.Item className="flex items-end justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Add new Blog
              </Button>
            </Form.Item>
          </Form>
        </section>
      )}
    </>
  );
};

export default AddBlog;
