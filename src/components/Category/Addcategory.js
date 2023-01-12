import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import axiosAll from "../../other/axiosAll";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const [path, setPath] = useState();
  const [parentId, setParentId] = useState();
  const [image, setImage] = useState();
  const [success, setSuccess] = useState(false);
  const [parent, setParent] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/category";

  const onFinish = () => {
    try {
      axiosAll.post(
        `/newcategory`,
        JSON.stringify({
          category,
          image,
          parentId,
          path,
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

  useEffect(() => {
    try {
      axiosAll.get("/listcategory").then((response) => {
        setParent(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(parent);

  //   const handleChange = (e) => {
  //     console.log(e);
  //   };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="category">back to Category Table</Link>
          </p>
        </section>
      ) : (
        <section className="flex items-center flex-col">
          <h1 className="mb-5 text-xl">Add new Category</h1>
          <Form
            name="normal_login"
            className="w-full md:w-1/2"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item name="category">
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="category"
              />
            </Form.Item>
            <Form.Item name="image">
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="image"
              />
            </Form.Item>
            <Form.Item name="path">
              <Input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="path"
              />
            </Form.Item>
            <Form.Item name="parentId">
              {/* <Input
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="parentId"
              /> */}
              <Select
                placeholder="select Parent's Category"
                options={parent.category}
                onChange={(e) => {
                  if (e === "10") {
                    setParentId(0);
                  } else setParentId(e);
                  console.log(e);
                }}
              >
                {parent.map((province) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.category || "null"}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="flex items-end justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Add new Category
              </Button>
            </Form.Item>
          </Form>
        </section>
      )}
    </>
  );
};

export default AddCategory;
