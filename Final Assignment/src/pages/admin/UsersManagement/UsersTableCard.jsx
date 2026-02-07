import React from 'react';
import { Card, Table, Tag, Space, Avatar, Button, Popconfirm } from 'antd';
import { UserOutlined, SwapOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const UsersTableCard = ({
  users = [],
  loading,
  ticketCounts = {},
  onViewDetails,
  onTransfer,
  onDelete,
}) => {
  const getStatusTag = (status) => {
    const statusConfig = {
      PENDING: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
      ACTIVE: { color: 'green', icon: <CheckCircleOutlined />, text: 'Active' },
      REJECTED: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
    };
    const config = statusConfig[status] || { color: 'default', icon: null, text: status };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const userColumns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar src={record.displayPicture} icon={<UserOutlined />} />
          <div>
            <div className="user-name">{record.username}</div>
            <div className="user-email">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Roles',
      key: 'roles',
      render: (_, record) => (
        <Space>
          {record.role && (
            <Tag key={record.role.id} color="blue">
              {record.role.name}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Assigned Tickets',
      key: 'ticketCount',
      render: (_, record) => {
        const count = ticketCounts[record.id] ?? 0;
        return (
          <Tag color={count > 0 ? 'orange' : 'default'}>
            {count} {count === 1 ? 'ticket' : 'tickets'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const ticketCount = ticketCounts[record.id] ?? 0;
        const isAdminUser = record.role?.name === 'ADMIN';
        const canDelete = !isAdminUser && ticketCount === 0;

        return (
          <Space>
            <Button
              icon={<UserOutlined />}
              onClick={() => onViewDetails(record.id)}
            >
              View Details
            </Button>
            {ticketCount > 0 && (
              <Button
                type="primary"
                icon={<SwapOutlined />}
                onClick={() => onTransfer(record)}
              >
                Transfer Tickets
              </Button>
            )}
            <Popconfirm
              title="Delete User"
              description={
                ticketCount > 0
                  ? `This user has ${ticketCount} ticket(s) assigned. Please transfer tickets first.`
                  : 'Are you sure you want to delete this user?'
              }
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
              disabled={!canDelete}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                disabled={!canDelete}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card className="standard-card" title="All Users">
      <Table
        dataSource={users}
        columns={userColumns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default UsersTableCard;

