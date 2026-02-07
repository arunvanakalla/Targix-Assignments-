import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Space } from 'antd';
import { 
  HomeOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Layout.css';

const { Header, Content } = AntLayout;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Dashboard' },
    { key: '/tickets', icon: <FileTextOutlined />, label: 'Tickets' },
    ...(isAdmin() ? [{ key: '/admin/users', icon: <TeamOutlined />, label: 'Users' }] : []),
    { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile', onClick: () => navigate('/profile') },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout },
  ];

  return (
    <AntLayout className="layout-container">
      <Header className="layout-header">
        <div className="layout-logo">
          Ticket Now
        </div>
        
        <Space size="large">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="layout-menu"
          />
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="layout-user-dropdown">
              <Avatar src={user?.displayPicture} icon={<UserOutlined />} />
              <span>{user?.username || user?.email}</span>
            </Space>
          </Dropdown>
        </Space>
      </Header>
      
      <Content className="layout-content">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;