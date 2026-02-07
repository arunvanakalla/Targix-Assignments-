import React from 'react';
import { Modal, Button, Avatar, Typography, Space, Tag, Card, Divider } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserDetailModal = ({
  visible,
  user,
  ticketCounts = {},
  loading,
  onClose,
  onOpenResetPassword,
}) => {
  // Check if user has ADMIN role
  const isAdminUser = user?.role?.name === 'ADMIN';
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

  return (
    <Modal
      title={
        <div className="user-detail-modal-title">
          <UserOutlined className="user-detail-modal-icon" />
          <span>User Details</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        ...(!isAdminUser ? [
          <Button 
            key="reset" 
            type="primary" 
            danger
            onClick={onOpenResetPassword}
            className="modal-button"
          >
            Reset Password
          </Button>
        ] : []),
        <Button 
          key="close" 
          onClick={onClose}
          className="modal-button"
        >
          Close
        </Button>
      ]}
      width={800}
    >
      {loading ? (
        <div className="loading-container">
          <Text>Loading user details...</Text>
        </div>
      ) : user ? (
        <div className="user-detail-content">
          {/* User Header Section */}
          <div className="user-detail-header">
            <Avatar 
              src={user.displayPicture} 
              icon={<UserOutlined />} 
              size={100}
              className="user-detail-avatar"
            />
            <div className="user-detail-header-content">
              <Title level={3} className="user-detail-title user-detail-title-spacing">
                {user.username}
              </Title>
              <Space direction="vertical" size="small">
                <Text type="secondary" className="user-detail-email">
                  <MailOutlined /> {user.email}
                </Text>
                <div className="user-detail-status-spacing">
                  {getStatusTag(user.status)}
                </div>
              </Space>
            </div>
          </div>

          <Divider className="divider-standard" />

          {/* User Information Cards */}
          <div className="user-info-grid">
            <Card 
              size="small" 
              className="user-info-card"
            >
              <div className="user-info-label">
                <Text type="secondary" className="user-info-label-text">
                  Roles
                </Text>
              </div>
              <Space wrap>
                {user.role && (
                  <Tag 
                    key={user.role.id} 
                    color="blue"
                    className="user-info-tag"
                  >
                    {user.role.name}
                  </Tag>
                )}
              </Space>
            </Card>

            <Card 
              size="small"
              className="user-info-card user-info-card-orange"
            >
              <div className="user-info-label">
                <Text type="secondary" className="user-info-label-text">
                  Assigned Tickets
                </Text>
              </div>
              <Tag 
                color={ticketCounts[user.id] > 0 ? 'orange' : 'default'}
                className="user-info-tag"
              >
                {ticketCounts[user.id] ?? 0} {ticketCounts[user.id] === 1 ? 'ticket' : 'tickets'}
              </Tag>
            </Card>
          </div>

          {/* Bio Section */}
          {user.bio && (
            <Card 
              size="small"
              className="user-info-card user-info-bio-card"
            >
              <div className="user-info-bio-label">
                <Text type="secondary" className="user-info-label-text">
                  Bio
                </Text>
              </div>
              <Text className="user-info-bio-text">
                {user.bio}
              </Text>
            </Card>
          )}
        </div>
      ) : null}
    </Modal>
  );
};

export default UserDetailModal;

