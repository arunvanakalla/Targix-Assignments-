import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getAllUsers,
  getPendingUsers,
  approveUser,
  approveUserAsAdmin,
  rejectUser,
  deleteUser,
  transferTickets,
  getUserById,
  resetUserPassword,
  getUsersForAssignment,
} from '../../services/userService';
import { getTicketsWithFilters } from '../../services/ticketService';
import { useAuth } from '../../context/AuthContext';
import PendingApprovalsCard from './UsersManagement/PendingApprovalsCard';
import UsersTableCard from './UsersManagement/UsersTableCard';
import TransferTicketsModal from './UsersManagement/TransferTicketsModal';
import UserDetailModal from './UsersManagement/UserDetailModal';
import ResetPasswordModal from './UsersManagement/ResetPasswordModal';
import '../../styles/UsersManagement.css';
import '../../styles/Page.css';

const UsersManagement = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [targetUserId, setTargetUserId] = useState(null);
  const [userDetailModalVisible, setUserDetailModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    enabled: isAdmin(),
    onError: () => message.error('Failed to fetch users'),
  });

  const { data: usersForAssignment = [] } = useQuery({
    queryKey: ['usersForAssignment'],
    queryFn: getUsersForAssignment,
    enabled: isAdmin(),
  });

  const { data: pendingUsers = [] } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: getPendingUsers,
    enabled: isAdmin(),
  });

  const ticketCountResults = useQuery({
    queryKey: ['ticketCounts', users.map((u) => u.id)],
    queryFn: async () => {
      const counts = {};
      await Promise.all(
        users.map(async (user) => {
          try {
            const tickets = await getTicketsWithFilters({ assignedToUserId: user.id });
            counts[user.id] = tickets.length;
          } catch {
            counts[user.id] = 0;
          }
        })
      );
      return counts;
    },
    enabled: isAdmin() && users.length > 0,
  });

  const ticketCounts = ticketCountResults.data || {};
  const loading = usersLoading;

  const approveMutation = useMutation({
    mutationFn: (userId) => approveUser(userId),
    onSuccess: () => {
      message.success('User approved successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
    },
    onError: (error) => message.error(error.response?.data?.message || 'Failed to approve user'),
  });

  const approveAsAdminMutation = useMutation({
    mutationFn: (userId) => approveUserAsAdmin(userId),
    onSuccess: () => {
      message.success('User approved as ADMIN successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
    },
    onError: (error) =>
      message.error(error.response?.data?.message || 'Failed to approve as admin'),
  });

  const rejectMutation = useMutation({
    mutationFn: (userId) => rejectUser(userId),
    onSuccess: () => {
      message.success('User rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
    },
    onError: (error) => message.error(error.response?.data?.message || 'Failed to reject user'),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      message.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to delete user';
      message.error(msg);
      if (msg.includes('ticket')) {
        queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
      }
    },
  });

  const transferMutation = useMutation({
    mutationFn: ({ fromUserId, toUserId }) => transferTickets(fromUserId, toUserId),
    onSuccess: (response) => {
      message.success(response || 'Tickets transferred successfully');
      setTransferModalVisible(false);
      setSelectedUser(null);
      setTargetUserId(null);
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['ticketCounts'] });
    },
    onError: (error) =>
      message.error(error.response?.data?.message || 'Failed to transfer tickets'),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ userId, newPassword }) => resetUserPassword(userId, newPassword),
    onSuccess: (res) => {
      message.success(res);
      setResetPasswordModalVisible(false);
    },
    onError: (error) =>
      message.error(error.response?.data?.message || 'Failed to reset password'),
  });

  const { data: selectedUserDetail, isLoading: loadingUserDetail } = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserById(selectedUserId),
    enabled: userDetailModalVisible && !!selectedUserId,
    onError: () => {
      message.error('Failed to load user details');
      setUserDetailModalVisible(false);
      setSelectedUserId(null);
    },
  });

  const handleDelete = (id) => deleteMutation.mutate(id);

  const handleTransferClick = (user) => {
    setSelectedUser(user);
    setTargetUserId(null);
    setTransferModalVisible(true);
  };

  const handleTransfer = () => {
    if (!targetUserId) {
      message.warning('Please select a target user');
      return;
    }
    if (targetUserId === selectedUser.id) {
      message.warning('Cannot transfer tickets to the same user');
      return;
    }
    transferMutation.mutate({ fromUserId: selectedUser.id, toUserId: targetUserId });
  };

  const handleViewDetails = (id) => {
    setSelectedUserId(id);
    setUserDetailModalVisible(true);
  };

  const handleResetPassword = (values) => {
    const { newPassword } = values;
    
    const isAdminUser = selectedUserDetail?.role?.name === 'ADMIN';
    
    if (isAdminUser) {
      message.error('Cannot reset password for admin users');
      return;
    }
    
    resetPasswordMutation.mutate({ userId: selectedUserId, newPassword });
  };

  const handleCloseTransferModal = () => {
    setTransferModalVisible(false);
    setSelectedUser(null);
    setTargetUserId(null);
  };

  const handleCloseUserDetailModal = () => {
    setUserDetailModalVisible(false);
    setSelectedUserId(null);
  };

  const handleCloseResetPasswordModal = () => {
    setResetPasswordModalVisible(false);
  };

  const handleOpenResetPassword = () => {
    setResetPasswordModalVisible(true);
  };

  if (!isAdmin()) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
      </div>

      <PendingApprovalsCard
        pendingUsers={pendingUsers}
        approveMutation={approveMutation}
        approveAsAdminMutation={approveAsAdminMutation}
        rejectMutation={rejectMutation}
      />

      <UsersTableCard
        users={users}
        loading={loading}
        ticketCounts={ticketCounts}
        onViewDetails={handleViewDetails}
        onTransfer={handleTransferClick}
        onDelete={handleDelete}
      />

      <TransferTicketsModal
        visible={transferModalVisible}
        selectedUser={selectedUser}
        usersForAssignment={usersForAssignment}
        ticketCounts={ticketCounts}
        targetUserId={targetUserId}
        onChangeTargetUser={setTargetUserId}
        onTransfer={handleTransfer}
        onCancel={handleCloseTransferModal}
        confirmLoading={transferMutation.isPending}
      />

      <UserDetailModal
        visible={userDetailModalVisible}
        user={selectedUserDetail}
        ticketCounts={ticketCounts}
        loading={loadingUserDetail}
        onClose={handleCloseUserDetailModal}
        onOpenResetPassword={handleOpenResetPassword}
      />

      <ResetPasswordModal
        visible={resetPasswordModalVisible}
        user={selectedUserDetail}
        onOk={handleResetPassword}
        onCancel={handleCloseResetPasswordModal}
        confirmLoading={resetPasswordMutation.isPending}
      />
    </div>
  );
};

export default UsersManagement;