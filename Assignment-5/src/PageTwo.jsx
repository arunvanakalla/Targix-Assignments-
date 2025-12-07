// PageTwo.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import axios from "axios";
import { useProduct } from "./ProductContext";

function PageTwo() {
  const navigate = useNavigate();
  const { newProduct, setNewProduct } = useProduct();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newProduct) {
      form.setFieldsValue(newProduct);
    }
  }, [newProduct, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://dummyjson.com/products/add",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Created product:", response.data);
      message.success("Product created successfully!");

      setNewProduct(null); // clear context after success
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  // ❗ If user opens /confirm directly or context is empty
  if (!newProduct) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <h2>No Product Data</h2>
          <p>Please go back and add a product from Page 1.</p>
          <Button type="primary" onClick={() => navigate("/")}>
            Go to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2>Confirm & Create Product</h2>
        <p>Please check the details below and confirm to create the product.</p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter product title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter product description",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Confirm & Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PageTwo;
