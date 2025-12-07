import { useState, useEffect } from "react";
import {
  DatePicker,
  Input,
  Select,
  Table,
  Modal,
  Form,
  InputNumber,
  Button,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./ProductContext";

const { Search } = Input;

function PageOne() {
  const navigate = useNavigate();
  const { setNewProduct } = useProduct();

  const today = dayjs();
  const sevenDaysAgo = dayjs().subtract(7, "day");

  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(today);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const disableEndDate = (current) => {
    return current && current < startDate;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let url = "https://dummyjson.com/products";

      if (searchText.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchText
        )}`;
      }

      const response = await axios.get(url);
      let items = response.data.products || [];

      const uniqueCategories = Array.from(
        new Set(items.map((item) => item.category))
      );
      setCategories(uniqueCategories);

      if (categoryFilter !== "all") {
        items = items.filter((item) => item.category === categoryFilter);
      }

      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
  ];

  const openModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Modal form values:", values);
      setIsModalOpen(false);

      // Save globally in context
      setNewProduct(values);

      // Navigate to confirmation page
      navigate("/confirm");
    } catch (error) {
      console.log("Validation error:", error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Products</h2>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <div>
          <p>Start Date</p>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div>
          <p>End Date</p>
          <DatePicker
            value={endDate}
            disabledDate={disableEndDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Search
          placeholder="Search products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={fetchProducts}
          enterButton="Search"
        />

        <Select
          value={categoryFilter}
          style={{ width: 200 }}
          onChange={(value) => {
            setCategoryFilter(value);
            // optional: refresh immediately when category changes
            // fetchProducts();
          }}
        >
          <Select.Option value="all">All Categories</Select.Option>

          {categories.map((cat) => (
            <Select.Option key={cat} value={cat}>
              {cat}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={fetchProducts}>Apply</Button>

        <Button type="primary" onClick={openModal}>
          Add Product
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={products}
        columns={columns}
        loading={loading}
      />

      <Modal
        title="Add New Product"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Next"
        cancelText="Back"
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </div>
  );
}

export default PageOne;
