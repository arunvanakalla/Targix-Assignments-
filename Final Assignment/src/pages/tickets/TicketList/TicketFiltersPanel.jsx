import React from 'react';
import { Card, Row, Col, Select, Typography } from 'antd';

const { Text } = Typography;

const TicketFiltersPanel = ({
  isAdmin,
  viewMode,
  filtersExpanded,
  STATUS_OPTIONS,
  statusFilter,
  onStatusFilterChange,
  labels,
  labelFilter,
  onLabelFilterChange,
  users,
  assignedToFilter,
  onAssignedToFilterChange,
}) => {
  if (viewMode === 'unassigned' || !filtersExpanded) {
    return null;
  }

  return (
    <Card className="standard-card ticket-list-filters-panel-card">
      <div className="filters-panel">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-label">
              <Text strong className="filter-label-text">Status</Text>
            </div>
            <Select
              placeholder="All Statuses"
              allowClear
              className="full-width-select"
              value={statusFilter}
              onChange={onStatusFilterChange}
              options={STATUS_OPTIONS}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-label">
              <Text strong className="filter-label-text">Label</Text>
            </div>
            <Select
              placeholder="All Labels"
              allowClear
              className="full-width-select"
              value={labelFilter}
              onChange={onLabelFilterChange}
              options={labels.map((label) => ({
                label: label.name,
                value: label.id,
              }))}
            />
          </Col>
          {isAdmin && viewMode === 'all' && (
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="filter-label">
                <Text strong className="filter-label-text">Assigned To</Text>
              </div>
              <Select
                placeholder="All Users"
                allowClear
                showSearch
                className="full-width-select"
                value={assignedToFilter}
                onChange={onAssignedToFilterChange}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={users.map((user) => ({
                  label: `${user.username} (${user.email})`,
                  value: user.id,
                }))}
              />
            </Col>
          )}
        </Row>
      </div>
    </Card>
  );
};

export default TicketFiltersPanel;







