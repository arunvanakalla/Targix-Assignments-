import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Row, Col, Statistic, Button, Table, Tag, message, Skeleton} from 'antd';
import { 
  FileTextOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllTickets, getUnassignedTickets } from '../../services/ticketService';
import { getPendingUsers } from '../../services/userService';
import '../../styles/Dashboard.css';
import '../../styles/Page.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getAllTickets,
    onError: () => {
      message.error('Failed to load tickets');
    },
  });

  const { data: pendingUsers = [], isLoading: pendingUsersLoading } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: getPendingUsers,
    enabled: isAdmin(), 
    onError: () => {
      // Silently fail if not admin or no pending users
    },
  });

  // Query for unassigned tickets (only if admin)
  const { data: unassignedTickets = [], isLoading: unassignedLoading } = useQuery({
    queryKey: ['unassignedTickets'],
    queryFn: getUnassignedTickets,
    enabled: isAdmin(),
    onError: () => {
      // Silently fail if not admin or error
    },
  });

  // Calculate statistics from tickets data
  const stats = useMemo(() => {
    console.log(tickets);
  
    const totalTickets = tickets[0]?.allCount;
    const activeTickets = tickets.filter(
      (t) => t.status?.name !== 'DEPLOYED_DONE'
    ).length;
    const completedTickets = tickets.filter(
      (t) => t.status?.name === 'DEPLOYED_DONE'
    ).length;

    return {
      totalTickets,
      pendingUsers: pendingUsers.length || 0,
      unassignedTickets: unassignedTickets.length || 0,
      activeTickets,
      completedTickets,
    };
  }, [tickets, pendingUsers, unassignedTickets]);

  const loading = ticketsLoading || (isAdmin() && (pendingUsersLoading || unassignedLoading));

  const getStatusColor = (statusName) => {
    const map = {
      TODO: 'default',
      PAUSED: 'orange',
      IN_PROGRESS: 'blue',
      PR_REVIEW: 'purple',
      READY_TO_DEPLOY: 'cyan',
      DEPLOYED_DONE: 'green',
    };
    return map[statusName] || 'default';
  };

  const recentTickets = useMemo(() => {
    return tickets
      .sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt) : (a.createdAt ? new Date(a.createdAt) : new Date(0));
        const dateB = b.updatedAt ? new Date(b.updatedAt) : (b.createdAt ? new Date(b.createdAt) : new Date(0));
        return dateB - dateA; 
      })
      .slice(0, 5);
  }, [tickets]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: ['status', 'name'],
      key: 'status',
      width: 150,
      render: (name) => name ? <Tag color={getStatusColor(name)}>{name}</Tag> : '-',
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo', 'username'],
      key: 'assignedTo',
      width: 150,
      render: (username) => username || '-',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date, record) => {
        const displayDate = date || record.createdAt;
        return displayDate ? new Date(displayDate).toLocaleDateString() : '-';
      },
    },
  ];

  if (loading) {
    return (
      <div>
        <div className="dashboard-skeleton-header">
          <Skeleton.Input active size="large" className="dashboard-skeleton-title" />
          <Skeleton.Button active size="large" />
        </div>
        <Row gutter={16} className="dashboard-skeleton-cards">
          {[1, 2, 3, 4].map((i) => (
            <Col span={6} key={i}>
              <Card>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
        <Card>
          <Skeleton active paragraph={{ rows: 5 }} />
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        {isAdmin() && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            onClick={() => navigate('/tickets/new')}
          >
            Create Ticket
          </Button>
        )}
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="standard-card">
            <Statistic
              title="Total Tickets"
              value={stats.totalTickets}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        {isAdmin() && (
          <>
            <Col xs={24} sm={12} md={6}>
              <Card className="standard-card">
                <Statistic
                  title="Pending Users"
                  value={stats.pendingUsers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#faad14' }}
                  suffix={
                    stats.pendingUsers > 0 && (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => navigate('/admin/users')}
                        className="view-button"
                      >
                        View
                      </Button>
                    )
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="standard-card">
                <Statistic
                  title="Unassigned Tickets"
                  value={stats.unassignedTickets}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#ff4d4f' }}
                  suffix={
                    stats.unassignedTickets > 0 && (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => navigate('/tickets')}
                        className="view-button"
                      >
                        View
                      </Button>
                    )
                  }
                />
              </Card>
            </Col>
          </>
        )}
            <Col xs={24} sm={12} md={6}>
              <Card className="standard-card">
                <Statistic
                  title="Active Tickets"
              value={stats.activeTickets}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="standard-card">
            <Statistic
              title="Completed"
              value={stats.completedTickets}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Tickets Table */}
      <Card 
        className="standard-card"
        title="Recent Tickets" 
        extra={
          <Button type="link" onClick={() => navigate('/tickets')}>
            View All
          </Button>
        }
      >
        {recentTickets.length === 0 ? (
          <div className="empty-state">
            <FileTextOutlined className="empty-state-icon" />
            <p>No tickets yet</p>
            {isAdmin() && (
              <Button type="primary" onClick={() => navigate('/tickets/new')}>
                Create Your First Ticket
              </Button>
            )}
          </div>
        ) : (
          <Table
            dataSource={recentTickets}
            columns={columns}
            rowKey="id"
            pagination={false}
            size="middle"
            onRow={(record) => ({
              onClick: () => navigate(`/tickets/${record.id}`),
              className: 'clickable-row',
            })}
          />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;