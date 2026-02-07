import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal, Form, Select, message, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { assignUserToTicket } from '../../../services/ticketService';
import { getUsersForAssignment } from '../../../services/userService';

const { Text } = Typography;
const { Option } = Select;

const AssignTicketModal = ({ visible, ticket, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const { data: users = [], isLoading: usersLoading, error: usersError, refetch } = useQuery({
    queryKey: ['usersForAssignment'],
    queryFn: getUsersForAssignment,
    enabled: visible,
    refetchOnMount: true,
    staleTime: 0, 
    onError: (error) => {
      console.error('Error fetching users for assignment:', error);
      message.error('Failed to load users for assignment');
    },
  });

  useEffect(() => {
    if (visible) {
      refetch();
    }
  }, [visible, refetch]);

  const assignMutation = useMutation({
    mutationFn: (userEmail) => assignUserToTicket(ticket?.id, userEmail),
    onSuccess: () => {
      message.success('Ticket assigned successfully!');
      form.resetFields();
      setSelectedUserEmail(null);
      queryClient.invalidateQueries({ queryKey: ['unassignedTickets'] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
      onSuccess();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to assign ticket';
      message.error(errorMessage);
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      assignMutation.mutate(values.userEmail);
    } catch {

    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedUserEmail(null);
    onCancel();
  };

  return (
    <Modal
      title={
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {ticket ? `Assign Ticket - #${ticket.id} · ${ticket.title}` : 'Assign Ticket'}
        </span>
      }
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={assignMutation.isPending}
      okText="Assign"
      cancelText="Cancel"
      width={520}
      className="assign-ticket-modal"
    >
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary">
          Choose a user to assign this ticket.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="assign-form"
      >
        <Form.Item
          name="userEmail"
          label="Select User"
          rules={[{ required: true, message: 'Please select a user to assign' }]}
        >
          <Select
            placeholder="Select a user"
            showSearch
            optionFilterProp="children"
            loading={usersLoading}
            value={selectedUserEmail}
            onChange={setSelectedUserEmail}
            size="large"
            filterOption={(input, option) =>
              (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {users.map((user) => (
              <Option key={user.id} value={user.email}>
                {user.username} ({user.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        {users.length === 0 && !usersLoading && (
          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
            No active employee users available for assignment. 
            {usersError && <span style={{ color: 'red' }}> (Error loading users)</span>}
          </Text>
        )}
      </Form>
    </Modal>
  );
};

export default AssignTicketModal;



