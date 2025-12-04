import { useState, useEffect } from "react";
import { DatePicker, Input, Select, Table, Modal, Form, InputNumber, Button } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function PageOne() {
  const navigate = useNavigate();

  // ----- Date state -----
  const today = dayjs();
  const sevenDaysAgo = dayjs().subtract(7, "day");

  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(today);

  const disableEndDate = (current) => {
    return current && current < startDate;
  };

  // ----- Search & Filter state -----
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ----- Products & Categories state -----
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // dynamic categories
  const [loading, setLoading] = useState(false);

  // ----- Modal / New Product Form state -----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch products function
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

      // Build unique category list from items
      const uniqueCategories = Array.from(
        new Set(items.map((item) => item.category))
      );
      setCategories(uniqueCategories);

      // Filter by selected category if not "all"
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

  // Fetch initial products on mount
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Table columns
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

  // ----- Modal handlers -----
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
      setIsModalOpen(false);
      navigate("/confirm", { state: { newProduct: values } });
    } catch (error) {
      // validation failed, do nothing
    }
  };

  return (
    <div>
      <h2>Products</h2>

      {/* Date Range */}
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

      {/* Search + Filter + Add Product Button */}
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
          onChange={(value) => setCategoryFilter(value)}
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

      {/* Products Table */}
      <Table
        rowKey="id"
        dataSource={products}
        columns={columns}
        loading={loading}
      />

      {/* Add Product Modal */}
      <Modal
        title="Add New Product"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Next"
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
