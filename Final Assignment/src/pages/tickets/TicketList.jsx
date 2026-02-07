import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tag, message, Space, Button } from 'antd';
import { UserOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getTicketsWithFilters, getUnassignedTickets } from '../../services/ticketService';
import { getAllLabels } from '../../services/labelService';
import { getAllUsers } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import AssignTicketModal from './TicketList/AssignTicketModal';
import TicketTable from './TicketList/TicketTable';
import TicketListHeader from './TicketList/TicketListHeader';
import TicketFiltersPanel from './TicketList/TicketFiltersPanel';
import '../../styles/TicketList.css';
import '../../styles/Page.css';

const TicketList = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  
  const [viewMode, setViewMode] = useState('all');

  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [labelFilter, setLabelFilter] = useState(null);
  const [assignedToFilter, setAssignedToFilter] = useState(null);
  
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const filters = useMemo(() => {
    const filterObj = {};
    if (viewMode === 'my-assigned') {
      filterObj.myAssigned = true;
    }
    if (statusFilter) {
      filterObj.status = statusFilter;
    }
    if (labelFilter) {
      filterObj.labelId = labelFilter;
    }
    if (assignedToFilter && viewMode === 'all') {
      filterObj.assignedToUserId = assignedToFilter;
    }
    return filterObj;
  }, [viewMode, statusFilter, labelFilter, assignedToFilter]);

  const { data: unassignedTickets = [], isLoading: unassignedLoading } = useQuery({
    queryKey: ['unassignedTickets'],
    queryFn: getUnassignedTickets,
    enabled: viewMode === 'unassigned' && isAdmin(),
      onError: () => {
        message.error('Failed to load unassigned tickets');
      },
  });

  const { data: ticketsData = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => getTicketsWithFilters(filters),
    enabled: viewMode !== 'unassigned',
      onError: () => {
        message.error('Failed to load tickets');
      },
  });

  const { data: labels = [] } = useQuery({
    queryKey: ['labels'],
    queryFn: getAllLabels,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    enabled: isAdmin(),
  });

  const sourceTickets = viewMode === 'unassigned' ? unassignedTickets : ticketsData;

  const tickets = useMemo(() => {
    if (!searchText) return sourceTickets;
    const searchLower = searchText.toLowerCase();
    return sourceTickets.filter(
      (ticket) =>
        ticket.title?.toLowerCase().includes(searchLower) ||
        ticket.description?.toLowerCase().includes(searchLower) ||
        ticket.id?.toString().includes(searchLower)
    );
  }, [sourceTickets, searchText]);

  const loading = viewMode === 'unassigned' ? unassignedLoading : ticketsLoading;

  const handleAssignClick = (ticket, e) => {
    e.stopPropagation(); 
    setSelectedTicket(ticket);
    setAssignModalVisible(true);
  };

  const handleAssignSuccess = () => {
    setAssignModalVisible(false);
    setSelectedTicket(null);
    queryClient.invalidateQueries({ queryKey: ['unassignedTickets'] });
    queryClient.invalidateQueries({ queryKey: ['tickets'] });
  };

  const handleClearFilters = () => {
    setSearchText('');
    setStatusFilter(null);
    setLabelFilter(null);
    setAssignedToFilter(null);
  };

  const handleViewModeChange = (key) => {
    setViewMode(key);
    handleClearFilters();
  };
  
  const handleRemoveFilter = (filterType) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(null);
        break;
      case 'label':
        setLabelFilter(null);
        break;
      case 'assignedTo':
        setAssignedToFilter(null);
        break;
      case 'search':
        setSearchText('');
        break;
      default:
        break;
    }
  };

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

  const STATUS_OPTIONS = [
    { label: 'TODO', value: 'TODO' },
    { label: 'PAUSED', value: 'PAUSED' },
    { label: 'IN_PROGRESS', value: 'IN_PROGRESS' },
    { label: 'PR_REVIEW', value: 'PR_REVIEW' },
    { label: 'READY_TO_DEPLOY', value: 'READY_TO_DEPLOY' },
    { label: 'DEPLOYED_DONE', value: 'DEPLOYED_DONE' },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
    },
    {
      title: 'Status',
      dataIndex: ['status', 'name'],
      key: 'status',
      width: 150,
      render: (name) => name ? <Tag color={getStatusColor(name)}>{name}</Tag> : '-',
      sorter: (a, b) => (a.status?.name || '').localeCompare(b.status?.name || ''),
    },
    {
      title: 'Label',
      dataIndex: ['label', 'name'],
      key: 'label',
      width: 120,
      render: (name) => name || '-',
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo', 'username'],
      key: 'assignedTo',
      width: 150,
      render: (username) => username || '-',
    },
    {
      title: 'Created By',
      dataIndex: ['createdBy', 'username'],
      key: 'createdBy',
      width: 150,
      render: (username) => username || '-',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date) => date ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) : '-',
      sorter: (a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateA - dateB;
      },
      defaultSortOrder: 'descend',
    },
  ];

  const columnsWithActions = useMemo(() => {
    if (viewMode === 'unassigned' && isAdmin()) {
      return [
        ...columns,
        {
          title: 'Actions',
          key: 'actions',
          width: 120,
          fixed: 'right',
          render: (_, record) => (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={(e) => handleAssignClick(record, e)}
              size="small"
            >
              Assign
            </Button>
          ),
        },
      ];
    }
    return columns;
  }, [columns, viewMode, isAdmin]);

  const hasActiveFilters = searchText || statusFilter || labelFilter || assignedToFilter;

  const tabItems = [
    {
      key: 'all',
      label: 'All Tickets',
    },
  ];

  if (!isAdmin()) {
    tabItems.push({
      key: 'my-assigned',
      label: (
        <Space>
          <UserOutlined />
          My Assigned Tickets
        </Space>
      ),
    });
  }

  if (isAdmin()) {
    tabItems.push({
      key: 'unassigned',
      label: (
        <Space>
          <ExclamationCircleOutlined />
          Unassigned
        </Space>
      ),
    });
  }

  const activeFilterChips = [];
  if (statusFilter) {
    activeFilterChips.push({
      key: 'status',
      label: `Status: ${statusFilter}`,
      onClose: () => handleRemoveFilter('status'),
    });
  }
  if (labelFilter) {
    const labelName = labels.find(l => l.id === labelFilter)?.name || labelFilter;
    activeFilterChips.push({
      key: 'label',
      label: `Label: ${labelName}`,
      onClose: () => handleRemoveFilter('label'),
    });
  }
  if (assignedToFilter) {
    const userName = users.find(u => u.id === assignedToFilter)?.username || assignedToFilter;
    activeFilterChips.push({
      key: 'assignedTo',
      label: `Assigned: ${userName}`,
      onClose: () => handleRemoveFilter('assignedTo'),
    });
  }
  if (searchText) {
    activeFilterChips.push({
      key: 'search',
      label: `Search: "${searchText}"`,
      onClose: () => handleRemoveFilter('search'),
    });
  }

  return (
    <div className="page-container">
      <TicketListHeader
        isAdmin={isAdmin()}
        viewMode={viewMode}
        tabItems={tabItems}
        onViewModeChange={handleViewModeChange}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        filtersExpanded={filtersExpanded}
        onToggleFilters={() => setFiltersExpanded(!filtersExpanded)}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        activeFilterChips={activeFilterChips}
        onRemoveFilter={handleRemoveFilter}
        ticketsCount={tickets.length}
      />

      <TicketFiltersPanel
        isAdmin={isAdmin()}
        viewMode={viewMode}
        filtersExpanded={filtersExpanded}
        STATUS_OPTIONS={STATUS_OPTIONS}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        labels={labels}
        labelFilter={labelFilter}
        onLabelFilterChange={setLabelFilter}
        users={users}
        assignedToFilter={assignedToFilter}
        onAssignedToFilterChange={setAssignedToFilter}
      />

      {/* Tickets Table */}
      <TicketTable
        tickets={tickets}
        loading={loading}
        columnsWithActions={columnsWithActions}
      />

      {/* Assign Modal */}
      <AssignTicketModal
        visible={assignModalVisible}
        ticket={selectedTicket}
        onSuccess={handleAssignSuccess}
        onCancel={() => {
          setAssignModalVisible(false);
          setSelectedTicket(null);
        }}
      />
    </div>
  );
};

export default TicketList;