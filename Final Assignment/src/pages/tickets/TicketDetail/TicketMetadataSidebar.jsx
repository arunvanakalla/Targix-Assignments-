import React from 'react';
import { Card, Tag, Select, Space, Avatar, Typography, Divider } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined, TagOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TicketMetadataSidebar = ({
  ticket,
  isAdmin,
  statusColor,
  canUpdateStatus,
  availableStatuses,
  onStatusChange,
  statusMutationPending,
  labels,
  onLabelChange,
  users,
  onAssignmentChange,
  canUpdateTicket,
  updateTicketMutationPending,
}) => {
  return (
    <Card className="standard-card ticket-metadata-card">
      <div className="metadata-section">
        <Text type="secondary" className="metadata-label">
          <TagOutlined /> Status
        </Text>
        <div className="metadata-value">
          <Tag color={statusColor(ticket.status?.name)} className="tag-standard">
            {ticket.status?.name}
          </Tag>
          {canUpdateStatus && (
            <Select
              value={ticket.status?.name}
              onChange={onStatusChange}
              loading={statusMutationPending}
              className="metadata-select"
              options={availableStatuses.map(s => ({ label: s, value: s }))}
            />
          )}
        </div>
      </div>

      <Divider className="metadata-divider" />

      <div className="metadata-section">
        <Text type="secondary" className="metadata-label">
          <FileTextOutlined /> Label
        </Text>
        <div className="metadata-value">
          <Tag color="blue" className="tag-small">
            {ticket.label?.name || '-'}
          </Tag>
          {isAdmin && canUpdateTicket && (
            <Select
              value={ticket.label?.id}
              onChange={onLabelChange}
              loading={updateTicketMutationPending}
              className="metadata-select"
              options={labels.map(l => ({ label: l.name, value: l.id }))}
            />
          )}
        </div>
      </div>

      <Divider className="metadata-divider" />

      <div className="metadata-section">
        <Text type="secondary" className="metadata-label">
          <UserOutlined /> Assigned To
        </Text>
        <div className="metadata-value">
          {ticket.assignedTo ? (
            <Space>
              <Avatar 
                src={ticket.assignedTo?.displayPicture} 
                icon={<UserOutlined />}
                size="small"
              />
              <Text strong>{ticket.assignedTo?.username || '-'}</Text>
            </Space>
          ) : (
            <Text type="secondary" className="unassigned-text">Unassigned</Text>
          )}
          {isAdmin && canUpdateTicket && (
            <Select
              value={ticket.assignedTo?.id}
              onChange={onAssignmentChange}
              allowClear
              placeholder="Assign user"
              loading={updateTicketMutationPending}
              className="metadata-select"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={users.map(u => ({
                label: `${u.username} (${u.email})`,
                value: u.id
              }))}
            />
          )}
        </div>
      </div>

      <Divider className="metadata-divider" />

      <div className="metadata-section">
        <Text type="secondary" className="metadata-label">
          <UserOutlined /> Created By
        </Text>
        <div className="metadata-value">
          <Space>
            <Avatar 
              src={ticket.createdBy?.displayPicture} 
              icon={<UserOutlined />}
              size="small"
            />
            <Text strong>{ticket.createdBy?.username || '-'}</Text>
          </Space>
        </div>
      </div>

      <Divider className="metadata-divider" />

      <div className="metadata-section">
        <Text type="secondary" className="metadata-label">
          <CalendarOutlined /> Created
        </Text>
        <div className="metadata-value">
          <Text>
            {ticket.createdAt 
              ? new Date(ticket.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '-'}
          </Text>
        </div>
      </div>

      {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
        <>
          <Divider className="metadata-divider" />
          <div className="metadata-section">
            <Text type="secondary" className="metadata-label">
              <CalendarOutlined /> Updated
            </Text>
            <div className="metadata-value">
              <Text>
                {new Date(ticket.updatedAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default TicketMetadataSidebar;


