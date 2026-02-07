import api from './api';


export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const response = await api.put('/users/profile/password', {
    oldpassword: oldPassword,
    newpassword: newPassword,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getPendingUsers = async () => {
  const response = await api.get('/admin/pending-users');
  return response.data;
};

export const approveUser = async (userId) => {
  const response = await api.put(`/admin/approve/${userId}`);
  return response.data;
};

export const approveUserAsAdmin = async (userId) => {
  const response = await api.put(`/admin/approve-admin/${userId}`);
  return response.data;
};


export const rejectUser = async (userId) => {
  const response = await api.put(`/admin/reject/${userId}`);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const resetUserPassword = async (userId, newPassword) => {
  const response = await api.put(`/admin/users/${userId}/password`, {
    newPassword: newPassword,
  });
  return response.data;
};

export const transferTickets = async (fromUserId, targetUserId) => {
  const response = await api.post(`/admin/users/${fromUserId}/transfer-tickets`, {
    targetUserId: targetUserId,
  });
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const getUsersForAssignment = async () => {
  const response = await api.get('/admin/users/for-assignment');
  return response.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/users/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};