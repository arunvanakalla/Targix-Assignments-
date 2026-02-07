import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  message, 
  Space,
  Typography,
  Divider
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined, 
  UserOutlined,
  TagOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { createTicket } from '../../services/ticketService';
import { getUsersForAssignment } from '../../services/userService';
import { getAllLabels } from '../../services/labelService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/TicketForm.css';
import '../../styles/Page.css';

const { TextArea } = Input;
const { Text } = Typography;

const TicketForm = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['usersForAssignment'],
    queryFn: getUsersForAssignment,
    refetchOnMount: true,
    staleTime: 0, 
  });

  const { data: labels = [], isLoading: labelsLoading } = useQuery({
    queryKey: ['labels'],
    queryFn: getAllLabels,
  });

  const fetchingData = usersLoading || labelsLoading;

  useEffect(() => {
    if (!isAdmin()) {
      message.error('Only admins can create tickets');
      navigate('/tickets');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    refetchUsers();
  }, [refetchUsers]);

  const ticketMutation = useMutation({
    mutationFn: (values) => createTicket(values),
    onSuccess: () => {
      message.success({
        content: 'Ticket created successfully!',
        duration: 2,
      });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['unassignedTickets'] });
      setTimeout(() => {
        navigate('/tickets');
      }, 500);
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to create ticket';
      message.error({
        content: errorMsg,
        duration: 4,
      });
    },
  });

  const handleSubmit = (values) => {
    ticketMutation.mutate(values);
  };

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    navigate('/tickets');
  };

  if (!isAdmin()) {
    return null; 
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Create New Ticket</h1>
      </div>
      <Card className="standard-card" loading={fetchingData}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={ticketMutation.isPending || fetchingData}
          size="large"
        >
          <Form.Item
            name="title"
            label={
              <Space>
                <FileTextOutlined />
                <span>Title</span>
              </Space>
            }
            rules={[
              { required: true, message: 'Please enter ticket title' },
              { min: 3, message: 'Title must be at least 3 characters' },
              { max: 200, message: 'Title cannot exceed 200 characters' },
            ]}
            hasFeedback
          >
            <Input 
              placeholder="Enter ticket title (e.g., Fix login bug)" 
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <Space>
                <FileTextOutlined />
                <span>Description</span>
              </Space>
            }
            rules={[
              { required: true, message: 'Please enter ticket description' },
              { min: 10, message: 'Description must be at least 10 characters' },
              { max: 2000, message: 'Description cannot exceed 2000 characters' },
            ]}
            hasFeedback
          >
            <TextArea
              rows={8}
              placeholder="Provide a detailed description of the ticket..."
              showCount
              maxLength={2000}
            />
          </Form.Item>

          <Divider />

          <Form.Item
            name="assignedToUserId"
            label={
              <Space>
                <UserOutlined />
                <span>Assigned To</span>
              </Space>
            }
            rules={[]}
            hasFeedback
            tooltip="Select the user who will be responsible for this ticket (optional - can be assigned later)"
          >
            <Select
              placeholder="Select a user (optional)"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              notFoundContent={fetchingData ? 'Loading users...' : 'No users found'}
              options={users.map((user) => ({
                label: `${user.username} (${user.email})`,
                value: user.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="labelId"
            label={
              <Space>
                <TagOutlined />
                <span>Label</span>
              </Space>
            }
            rules={[{ required: true, message: 'Please select label' }]}
            hasFeedback
            tooltip="Categorize this ticket (Bug, Feature, Task, etc.)"
          >
            <Select
              placeholder="Select a label"
              notFoundContent={fetchingData ? 'Loading labels...' : 'No labels found'}
              options={labels.map((label) => ({
                label: label.name,
                value: label.id,
              }))}
            />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={ticketMutation.isPending}
                icon={<SaveOutlined />}
                size="large"
              >
                Create Ticket
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                size="large"
                disabled={ticketMutation.isPending}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>

          <div className="ticket-form-help">
            <Text type="secondary" className="ticket-form-help-text">
              <strong>Note:</strong> Fields marked with <Text type="danger">*</Text> are required. 
              "Assigned To" is optional - you can assign the ticket later. 
              The ticket will be created with status "TODO" and can be updated later.
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TicketForm;
