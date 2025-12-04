import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import axios from "axios";

function PageTwo() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Data passed from Page 1
  const newProduct = location.state?.newProduct;

  // If no data (e.g. user directly opens /confirm), go back to Page 1
  useEffect(() => {
    if (!newProduct) {
      navigate("/");
    } else {
      // Prefill form with data from Page 1
      form.setFieldsValue(newProduct);
    }
  }, [newProduct, navigate, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // POST request to create product
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

      // After success, you can navigate back or stay here
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  if (!newProduct) {
    // brief fallback while redirecting
    return <p>Redirecting...</p>;
  }

  return (
    <div
        style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5", // optional, just to separate background
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

        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
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
                { required: true, message: "Please enter product description" },
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
