import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Descriptions, 
  Tag, 
  message, 
  Tabs,
  Row,
  Col,
  Space,
  Typography
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  LockOutlined,
  MailOutlined,
  CheckCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { getUserProfile, updateUserProfile, changePassword, uploadAvatar } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Profile.css';
import '../../styles/Page.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('info');
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const fileInputRef = useRef(null);

  const { data: profile, isLoading: loading, error: profileError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    onError: () => {
      message.error('Failed to load profile');
    },
  });

  useEffect(() => {
    if (profile) {
      profileForm.setFieldsValue({
        username: profile.username,
        bio: profile.bio || '',
      });
    }
  }, [profile, profileForm]);

  const updateProfileMutation = useMutation({
    mutationFn: (values) => updateUserProfile(profile.id, values),
    onSuccess: (updated) => {
      updateUser(updated);
      message.success('Profile updated successfully');
      setActiveTab('info'); 
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to update profile';
      message.error(errorMsg);
    },
  });

  const handleUpdateProfile = (values) => {
    if (!profile) return;
    
    const updateData = {
      username: values.username,
    };

    if (values.bio && values.bio.trim() !== '') {
      updateData.bio = values.bio.trim();
    } else {
      updateData.bio = null; 
    }
    
    updateProfileMutation.mutate(updateData);
  };

  const changePasswordMutation = useMutation({
    mutationFn: (values) => changePassword(values.oldPassword, values.newPassword),
    onSuccess: () => {
      passwordForm.resetFields();
      message.success('Password changed successfully');
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to change password';
      message.error(errorMsg);
    },
  });

  const handleChangePassword = (values) => {
    changePasswordMutation.mutate(values);
  };

  const avatarMutation = useMutation({
    mutationFn: (file) => uploadAvatar(file),
    onSuccess: (updated) => {
      updateUser(updated);
      message.success('Profile photo updated');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to upload profile photo';
      message.error(errorMsg);
    },
  });


  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      message.error('Please select an image file');
      return;
    }
    if (file.size > maxSize) {
      message.error('File is too large (max 2MB)');
      return;
    }

    avatarMutation.mutate(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading || !profile) {
    return (
      <div className="profile-loading">
        <Text>Loading profile...</Text>
      </div>
    );
  }

  const tabItems = [
    {
      key: 'info',
      label: (
        <span>
          <UserOutlined />
          Profile Information
        </span>
      ),
      children: ( 
        <Card>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Username">
              <Text strong>{profile.username}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <Space>
                <MailOutlined />
                <Text>{profile.email}</Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Bio">
              <Text>{profile.bio || <Text type="secondary">No bio provided</Text>}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag 
                color={profile.status === 'ACTIVE' ? 'green' : 'orange'}
                icon={profile.status === 'ACTIVE' ? <CheckCircleOutlined /> : null}
              >
                {profile.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <Space wrap>
                {profile.role && (
                  <Tag color="blue">
                    {profile.role.name}
                  </Tag>
                )}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
    {
      key: 'edit',
      label: (
        <span>
          <EditOutlined />
          Edit Profile
        </span>
      ),
      children: (
        <Card>
          <Form
            form={profileForm}
            layout="vertical"
            onFinish={handleUpdateProfile}
            disabled={updateProfileMutation.isPending}
            size="large"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input 
                placeholder="Enter username" 
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="bio"
              label="Bio"
              tooltip="Tell us about yourself (optional, max 500 characters)"
            >
              <TextArea
                rows={6}
                placeholder="Tell us about yourself..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={updateProfileMutation.isPending}
                size="large"
                icon={<EditOutlined />}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined />
          Change Password
        </span>
      ),
      children: (
        <Card>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
            disabled={changePasswordMutation.isPending}
            size="large"
          >
            <Form.Item
              name="oldPassword"
              label="Current Password"
              rules={[ 
                  { required: true, message: "Please enter your password" },
                ]}
            >
              <Input.Password 
                placeholder="Enter current password" 
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your password" },
                  { min: 8, message: "Password must be at least 8 characters" },
                  { pattern: /[A-Z]/, message: "Must include an uppercase letter" },
                  { pattern: /[a-z]/, message: "Must include a lowercase letter" },
                  { pattern: /\d/, message: "Must include a number" },
                  { pattern: /[@$!%*?&]/, message: "Must include a special character" },
              ]}
            >
              <Input.Password 
                placeholder="Enter new password" 
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
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
              <Input.Password 
                placeholder="Confirm new password" 
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={changePasswordMutation.isPending}
                size="large"
                icon={<LockOutlined />}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>
      
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8} lg={7} xl={6}>
          <Card className="standard-card profile-summary-card">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={profile.displayPicture}
                icon={<UserOutlined />}
                size={120}
                className="profile-avatar"
                style={{ cursor: 'pointer' }}
                onClick={handleAvatarClick}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#1890ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                onClick={handleAvatarClick}
              >
                <PlusOutlined style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <Title level={3} className="profile-username">
              {profile.username}
            </Title>
            <Text type="secondary" className="profile-email">
              <MailOutlined /> {profile.email}
            </Text>
            
            <Space direction="vertical" size="small" className="profile-info-section">
              <div>
                <Text type="secondary" className="profile-info-label">Status</Text>
                <div className="profile-info-value">
                  <Tag 
                    color={profile.status === 'ACTIVE' ? 'green' : 'orange'}
                    icon={profile.status === 'ACTIVE' ? <CheckCircleOutlined /> : null}
                    className="profile-status-tag"
                  >
                    {profile.status}
                  </Tag>
                </div>
              </div>
              
              <div>
                <Text type="secondary" className="profile-info-label">Roles</Text>
                <div className="profile-roles-container">
                  <Space wrap>
                    {profile.role && (
                      <Tag color="blue" className="profile-role-tag">
                        {profile.role.name}
                      </Tag>
                    )}
                  </Space>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Right Main Content - Tabs */}
        <Col xs={24} sm={24} md={16} lg={17} xl={18}>
          <Card className="standard-card">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="large"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;