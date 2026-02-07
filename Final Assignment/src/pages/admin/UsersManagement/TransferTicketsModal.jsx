import React from 'react';
import { Modal, Select, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const TransferTicketsModal = ({
  visible,
  selectedUser,
  usersForAssignment = [],
  ticketCounts = {},
  targetUserId,
  onChangeTargetUser,
  onTransfer,
  onCancel,
  confirmLoading,
}) => {
  return (
    <Modal
      title="Transfer Tickets"
      open={visible}
      onOk={onTransfer}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="Transfer"
      cancelText="Cancel"
    >
      {selectedUser && (
        <div>
          <p>
            Transfer all tickets from <strong>{selectedUser.username}</strong> to:
          </p>
          <Select
            className="full-width-select"
            placeholder="Select target user"
            value={targetUserId}
            onChange={onChangeTargetUser}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {usersForAssignment
              .filter((user) => user.id !== selectedUser.id)
              .map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </Option>
              ))}
          </Select>
          <p className="transfer-info-text">
            This will transfer {ticketCounts[selectedUser.id] ?? 0} ticket(s) to the selected user.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default TransferTicketsModal;






