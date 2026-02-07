import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Row, Col, Skeleton, message } from 'antd';
import { getTicketById, updateTicketStatus, deleteTicket, updateTicket } from '../../services/ticketService';
import { getCommentsByTicket, createComment } from '../../services/commentService';
import { getUsersForAssignment } from '../../services/userService';
import { getAllLabels } from '../../services/labelService';
import { useAuth } from '../../context/AuthContext';
import TicketHeader from './TicketDetail/TicketHeader';
import TicketMetadataSidebar from './TicketDetail/TicketMetadataSidebar';
import TicketDescriptionSection from './TicketDetail/TicketDescriptionSection';
import TicketCommentsSection from './TicketDetail/TicketCommentsSection';
import '../../styles/quill.css';
import '../../styles/TicketDetail.css';
import '../../styles/Page.css';


const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  
  const commentQuillRef = useRef(null);
  const commentQuillInstanceRef = useRef(null);

  const { data: ticket, isLoading: ticketLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
    onError: (error) => {
      message.error('Failed to load ticket details');
      navigate('/tickets');
    },
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['ticket', id, 'comments'],
    queryFn: () => getCommentsByTicket(id),
    enabled: !!id,
  });

  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ['usersForAssignment'],
    queryFn: getUsersForAssignment,
    enabled: isAdmin() && !!ticket,
    refetchOnMount: true,
    staleTime: 0,
  });

  const { data: labels = [] } = useQuery({
    queryKey: ['labels'],
    queryFn: getAllLabels,
    enabled: isAdmin() && !!ticket,
  });

  const loading = ticketLoading || commentsLoading;

  useEffect(() => {
    if (isAdmin() && ticket) {
      refetchUsers();
    }
  }, [isAdmin, ticket, refetchUsers]);

  const updateTicketMutation = useMutation({
    mutationFn: (data) => updateTicket(id, data),
    onSuccess: () => {
      message.success('Ticket updated successfully');
      queryClient.invalidateQueries({ queryKey: ['ticket', id] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to update ticket';
      message.error(msg);
    },
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus) => updateTicketStatus(id, newStatus),
    onSuccess: () => {
      message.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['ticket', id] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to update status';
      message.error(msg);
    },
  });

  const commentMutation = useMutation({
    mutationFn: (content) => createComment(id, content),
    onSuccess: () => {
      if (commentQuillInstanceRef.current) {
        commentQuillInstanceRef.current.root.innerHTML = '';
      }
      message.success('Comment added successfully');
      queryClient.invalidateQueries({ queryKey: ['ticket', id, 'comments'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', id] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to add comment';
      message.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTicket(id),
    onSuccess: () => {
      message.success('Ticket deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      navigate('/tickets');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to delete ticket';
      message.error(msg);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const canUpdateTicket = () => {
    if (!ticket) return false;
    return ticket.status?.name !== 'DEPLOYED_DONE';
  };

  const handleTitleEdit = () => {
    if (!isAdmin()) return;
    if (!canUpdateTicket()) {
      message.warning('Cannot update ticket that is already deployed');
      return;
    }
    setEditingTitle(ticket.title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (!editingTitle.trim()) {
      message.warning('Title cannot be empty');
      return;
    }
    updateTicketMutation.mutate({ title: editingTitle });
  };

  const handleTitleCancel = () => {
    setIsEditingTitle(false);
    setEditingTitle('');
  };

  const handleDescriptionEdit = () => {
    if (!isAdmin()) return;
    if (!canUpdateTicket()) {
      message.warning('Cannot update ticket that is already deployed');
      return;
    }
    setEditingDescription(ticket?.description || '');
    setIsEditingDescription(true);
  };

  const handleDescriptionSave = () => {
    const content = editingDescription?.trim() || '';
    if (!content) {
      message.warning('Description cannot be empty');
      return;
    }
    updateTicketMutation.mutate({ description: content });
  };

  const handleDescriptionCancel = () => {
    setIsEditingDescription(false);
    setEditingDescription('');
  };

  const handleStatusChange = (newStatus) => {
    if (!ticket) return;
    if (ticket.status?.name === 'DEPLOYED_DONE') {
      message.warning('Cannot change status of a completed ticket');
      return;
    }
    statusMutation.mutate(newStatus);
  };

  const handleLabelChange = (labelId) => {
    if (!isAdmin()) return;
    if (!canUpdateTicket()) {
      message.warning('Cannot update ticket that is already deployed');
      return;
    }
    updateTicketMutation.mutate({ labelId });
  };

  const handleAssignmentChange = (userId) => {
    if (!isAdmin()) return;
    if (!canUpdateTicket()) {
      message.warning('Cannot update ticket that is already deployed');
      return;
    }
    updateTicketMutation.mutate({ assignedToUserId: userId || null });
  };

  const handleAddComment = () => {
    if (!canUpdateTicket()) {
      message.warning('Cannot add comment to ticket that is already deployed');
      return;
    }

    const quill = commentQuillInstanceRef.current;
    if (!quill) {
      message.warning('Editor not ready');
      return;
    }

    const plainText = quill.getText().trim(); 
    const htmlContent = quill.root.innerHTML;

    if (!plainText) {
      message.info('Please enter the comment');
      return;
    }

    if (!ticket?.assignedTo) {
      message.warning('Cannot comment on unassigned ticket. Please assign the ticket first.');
      return;
    }

    const isAssignedUser = ticket?.assignedTo?.id === currentUser?.id;
    if (!isAssignedUser && !isAdmin()) {
      message.error('Only assigned user or admin can add comments');
      return;
    }

    commentMutation.mutate(htmlContent);
  };

  const statusColor = (statusName) => {
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

  const canComment = () => {
    if (!ticket || !currentUser) return false;
    if (!ticket.assignedTo) return false;
    const isAssignedUser = ticket.assignedTo?.id === currentUser.id;
    return isAssignedUser || isAdmin();
  };

  const canUpdateStatus = () => {
    if (!ticket || !currentUser) return false;

    const currentStatus = ticket.status?.name;
    const isAdminUser = isAdmin();

    if (currentStatus === 'DEPLOYED_DONE') {
      return false;
    }

    if (currentStatus === 'READY_TO_DEPLOY' && !isAdminUser) {
      return false;
    }
    
    if (isAdminUser) {
      return true;
    }

    if (!ticket.assignedTo) return false;
    return ticket.assignedTo.id === currentUser.id;
  };

  const getAvailableStatuses = () => {
    const allStatuses = ['TODO', 'PAUSED', 'IN_PROGRESS', 'PR_REVIEW', 'READY_TO_DEPLOY', 'DEPLOYED_DONE'];
    if (isAdmin()) return allStatuses;
    return allStatuses.filter(s => s !== 'READY_TO_DEPLOY' && s !== 'DEPLOYED_DONE');
  };

  if (loading) {
    return (
      <div className="ticket-detail-container">
        <Card>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return <div className="ticket-detail-container">Ticket not found</div>;
  }

  const availableStatuses = getAvailableStatuses();
  const activeUsers = users;

  return (
    <div className="page-container ticket-detail-page">
      <div className="page-header">
        <h1 className="page-title">Ticket #{ticket.id}</h1>
      </div>

      <TicketHeader
        ticket={ticket}
        isAdmin={isAdmin()}
        isEditingTitle={isEditingTitle}
        editingTitle={editingTitle}
        onTitleChange={setEditingTitle}
        onTitleSave={handleTitleSave}
        onTitleCancel={handleTitleCancel}
        onTitleEdit={handleTitleEdit}
        statusColor={statusColor}
        canUpdateStatus={canUpdateStatus()}
        availableStatuses={availableStatuses}
        onStatusChange={handleStatusChange}
        statusMutationPending={statusMutation.isPending}
        onDelete={handleDelete}
        canUpdateTicket={canUpdateTicket()}
        updateTicketMutationPending={updateTicketMutation.isPending}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <TicketDescriptionSection
            ticket={ticket}
            isAdmin={isAdmin()}
            isEditingDescription={isEditingDescription}
            editingDescription={editingDescription}
            onDescriptionChange={setEditingDescription}
            onDescriptionSave={handleDescriptionSave}
            onDescriptionCancel={handleDescriptionCancel}
            onDescriptionEdit={handleDescriptionEdit}
            canUpdateTicket={canUpdateTicket()}
            updateTicketMutationPending={updateTicketMutation.isPending}
          />

          <TicketCommentsSection
            ticket={ticket}
            comments={comments}
            currentUser={currentUser}
            canComment={canComment()}
            commentQuillRef={commentQuillRef}
            commentQuillInstanceRef={commentQuillInstanceRef}
            onAddComment={handleAddComment}
            commentMutationPending={commentMutation.isPending}
            canUpdateTicket={canUpdateTicket()}
          />
        </Col>

        <Col xs={24} lg={6}>
          <TicketMetadataSidebar
            ticket={ticket}
            isAdmin={isAdmin()}
            statusColor={statusColor}
            canUpdateStatus={canUpdateStatus()}
            availableStatuses={availableStatuses}
            onStatusChange={handleStatusChange}
            statusMutationPending={statusMutation.isPending}
            labels={labels}
            onLabelChange={handleLabelChange}
            users={activeUsers}
            onAssignmentChange={handleAssignmentChange}
            canUpdateTicket={canUpdateTicket()}
            updateTicketMutationPending={updateTicketMutation.isPending}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TicketDetail;
