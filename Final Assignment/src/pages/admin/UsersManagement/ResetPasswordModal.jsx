import React, { useEffect } from 'react';
import { Modal, Typography, Form, Input } from 'antd';

const { Text } = Typography;

const ResetPasswordModal = ({
  visible,
  user,
  onOk,
  onCancel,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  // Reset form when modal closes
  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Reset Password"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText="Reset Password"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onOk}
      >
  {user && (
    <>
      <p className="reset-password-info">
        Reset password for <strong>{user.username}</strong> ({user.email})
      </p>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
            { pattern: /[A-Z]/, message: "Must include an uppercase letter" },
            { pattern: /[a-z]/, message: "Must include a lowercase letter" },
            { pattern: /\d/, message: "Must include a number" },
            { pattern: /[@$!%*?&]/, message: "Must include a special character" },
        ]}
      >
        <Input.Password placeholder="Enter new password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: "Please enter your password" },
          { min: 8, message: "Password must be at least 8 characters" },
          { pattern: /[A-Z]/, message: "Must include an uppercase letter" },
          { pattern: /[a-z]/, message: "Must include a lowercase letter" },
          { pattern: /\d/, message: "Must include a number" },
          { pattern: /[@$!%*?&]/, message: "Must include a special character" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match'));
            },
          }),
        ]}
        >
        <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Text type="secondary" className="password-hint">
          Password must be at least 8 characters long.
        </Text>
        </>
        )}
      </Form>

    </Modal>
  );
};

export default ResetPasswordModal;

