import React from 'react';
import { Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../../styles/TicketList.css';
import '../../../styles/Page.css';

const TicketTable = ({ tickets, loading, columnsWithActions }) => {
  const navigate = useNavigate();

  return (
    <Card className="standard-card ticket-list-table-card">
      <Table
        rowKey="id"
        loading={loading}
        dataSource={tickets}
        columns={columnsWithActions}
        pagination={false}
        onRow={(record) => ({
          onClick: (e) => {
            if (e.target.closest('.ant-btn') || e.target.closest('.assign-button')) {
              return;
            }
            navigate(`/tickets/${record.id}`);
          },
          className: 'clickable-row',
        })}
        scroll={{ x: 1000 }}
      />
    </Card>
  );
};

export default TicketTable;







