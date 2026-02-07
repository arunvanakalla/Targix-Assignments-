import React from 'react';
import { Card, Button, Space, Typography, Input } from 'antd';
import { EditOutlined, FileTextOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

const TicketDescriptionSection = ({
  ticket,
  isAdmin,
  isEditingDescription,
  editingDescription,
  onDescriptionChange,
  onDescriptionSave,
  onDescriptionCancel,
  onDescriptionEdit,
  canUpdateTicket,
  updateTicketMutationPending,
}) => {
  return (
    <Card className="ticket-section-card">
      <div className="section-header">
        <Text strong className="section-title">
          <FileTextOutlined className="icon-blue" />
          Description
        </Text>
        {isAdmin && !isEditingDescription && canUpdateTicket && (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={onDescriptionEdit}
            className="section-edit-btn"
            size="small"
          >
            Edit
          </Button>
        )}
      </div>
      {isEditingDescription ? (
        <div className="description-edit-container">
          <TextArea
            value={editingDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Enter ticket description..."
            autoSize={{ minRows: 6, maxRows: 15 }}
            className="description-textarea"
            autoFocus
          />
          <Space className="description-edit-actions">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={onDescriptionSave}
              loading={updateTicketMutationPending}
            >
              Save
            </Button>
            <Button
              icon={<CloseOutlined />}
              onClick={onDescriptionCancel}
            >
              Cancel
            </Button>
          </Space>
        </div>
      ) : (
        <div
          className={
            isAdmin && canUpdateTicket
              ? 'ticket-description ticket-description--editable'
              : 'ticket-description'
          }
          onClick={isAdmin && canUpdateTicket ? onDescriptionEdit : undefined}
        >
          {ticket.description ? (
            <Text className="ticket-description-text">{ticket.description}</Text>
          ) : (
            <Text type="secondary" className="empty-description">
              {isAdmin ? 'Click to add description...' : 'No description provided'}
            </Text>
          )}
        </div>
      )}
    </Card>
  );
};

export default TicketDescriptionSection;

