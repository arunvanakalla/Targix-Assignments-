import React from 'react';
import { Card, Button, Input, Space, Tabs, Typography, Tag, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const TicketListHeader = ({
  isAdmin,
  viewMode,
  tabItems,
  onViewModeChange,
  searchText,
  onSearchTextChange,
  filtersExpanded,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  activeFilterChips,
  ticketsCount,
}) => {
  const navigate = useNavigate();

  const renderResultsText = () => {
    if (viewMode === 'unassigned') {
      return (
        <Text>
          Showing <strong>{ticketsCount}</strong> unassigned ticket{ticketsCount !== 1 ? 's' : ''}
        </Text>
      );
    }
    if (viewMode === 'my-assigned') {
      return (
        <Text>
          Showing <strong>{ticketsCount}</strong> assigned ticket{ticketsCount !== 1 ? 's' : ''}
        </Text>
      );
    }
    if (hasActiveFilters) {
      return (
        <Text>
          Showing <strong>{ticketsCount}</strong> filtered ticket{ticketsCount !== 1 ? 's' : ''}
        </Text>
      );
    }
    return (
      <Text>
        Total: <strong>{ticketsCount}</strong> ticket{ticketsCount !== 1 ? 's' : ''}
      </Text>
    );
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        {isAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/tickets/new')}
            size="large"
          >
            Create Ticket
          </Button>
        )}
      </div>

      <Card className="standard-card ticket-list-tabs-card">
        <Tabs
          activeKey={viewMode}
          onChange={onViewModeChange}
          items={tabItems}
          className="ticket-list-tabs"
        />
      </Card>

      <Card className="standard-card ticket-list-filters-card">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={16} md={14} lg={12}>
            <Input
              placeholder="Search tickets by title, description, or ID..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              size="large"
              className="ticket-search-input"
            />
          </Col>
          <Col xs={24} sm={8} md={10} lg={12}>
            <Space
              className="search-actions"
              style={{ width: '100%', justifyContent: 'flex-end' }}
            >
              {viewMode !== 'unassigned' && (
                <Button
                  icon={<FilterOutlined />}
                  onClick={onToggleFilters}
                  type={filtersExpanded ? 'primary' : 'default'}
                >
                  {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
                </Button>
              )}
              {hasActiveFilters && (
                <Button
                  icon={<ClearOutlined />}
                  onClick={onClearFilters}
                >
                  Clear All
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {activeFilterChips.length > 0 && (
          <div className="active-filters-container">
            <Space wrap>
              <Text type="secondary" className="active-filters-label">Active filters:</Text>
              {activeFilterChips.map((chip) => (
                <Tag
                  key={chip.key}
                  closable
                  onClose={chip.onClose}
                  className="filter-chip"
                >
                  {chip.label}
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </Card>

      <div className="results-count">
        {renderResultsText()}
      </div>
    </>
  );
};

export default TicketListHeader;

