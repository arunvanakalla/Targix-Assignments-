import React from 'react';
import { Card, Table, Tag, Button, Space, Avatar, Typography, Empty } from 'antd';
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PendingApprovalsCard = ({
  pendingUsers = [],
  approveMutation,
  approveAsAdminMutation,
  rejectMutation,
}) => {
  const pendingColumns = [
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
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      render: (bio) => bio || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => approveMutation.mutate(record.id)}
            loading={approveMutation.isPending}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => rejectMutation.mutate(record.id)}
            loading={rejectMutation.isPending}
          >
            Reject
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => approveAsAdminMutation.mutate(record.id)}
            loading={approveAsAdminMutation.isPending}
          >
            Approve as Admin
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      className="standard-card"
      title="Pending Approvals"
      extra={<Tag color={pendingUsers.length > 0 ? "orange" : "default"}>{pendingUsers.length} pending</Tag>}
    >
      {pendingUsers.length > 0 ? (
        <Table
          dataSource={pendingUsers}
          columns={pendingColumns}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <Empty
          description="No pending approvals"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="empty-padding"
        >
          <Text type="secondary">All user registrations have been processed.</Text>
        </Empty>
      )}
    </Card>
  );
};

export default PendingApprovalsCard;






