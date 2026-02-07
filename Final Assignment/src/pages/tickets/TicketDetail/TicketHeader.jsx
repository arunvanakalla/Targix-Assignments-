import React from 'react';
import { Card, Tag, Select, Button, Space, Popconfirm, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TicketHeader = ({
  ticket,
  isAdmin,
  isEditingTitle,
  editingTitle,
  onTitleChange,
  onTitleSave,
  onTitleCancel,
  onTitleEdit,
  statusColor,
  canUpdateStatus,
  availableStatuses,
  onStatusChange,
  statusMutationPending,
  onDelete,
  canUpdateTicket,
  updateTicketMutationPending,
}) => {
  return (
    <Card className="standard-card">
      <div className="ticket-header-padding">
        <div className="ticket-header-main">
          <div className="ticket-title-section">
            {isEditingTitle ? (
              <div className="title-edit-container">
                <Input
                  value={editingTitle}
                  onChange={(e) => onTitleChange(e.target.value)}
                  onPressEnter={onTitleSave}
                  autoFocus
                  className="title-input"
                />
                <Space className="title-edit-actions">
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={onTitleSave}
                    loading={updateTicketMutationPending}
                    size="small"
                  />
                  <Button
                    icon={<CloseOutlined />}
                    onClick={onTitleCancel}
                    size="small"
                  />
                </Space>
              </div>
            ) : (
              <div className="ticket-title-wrapper">
                <Title level={2} className="ticket-title">
                  {ticket.title}
                </Title>
                {isAdmin && canUpdateTicket && (
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={onTitleEdit}
                    className="edit-title-btn"
                    size="small"
                  />
                )}
              </div>
            )}
          </div>
          <div className="ticket-status-header">
            <Tag color={statusColor(ticket.status?.name)} className="status-badge-large">
              {ticket.status?.name}
            </Tag>
            {canUpdateStatus && (
              <Select
                value={ticket.status?.name}
                onChange={onStatusChange}
                loading={statusMutationPending}
                className="status-select-inline"
                options={availableStatuses.map(s => ({ label: s, value: s }))}
              />
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="flex-end">
            <Popconfirm
              title="Delete Ticket"
              description="Are you sure you want to delete this ticket? This action cannot be undone."
              onConfirm={onDelete}
              okText="Yes, Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                className="delete-ticket-btn"
              >
                Delete Ticket
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TicketHeader;


