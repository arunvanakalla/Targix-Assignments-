import api from './api';

export const getAllTickets = async () => {
  const response = await api.get('/users/tickets');
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await api.get(`/users/tickets/${id}`);
  return response.data;
};

export const updateTicketStatus = async (id, status) => {
  const response = await api.put(`/users/tickets/${id}/status`, { status });
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await api.post('/admin/tickets', ticketData);
  return response.data;
};

export const updateTicket = async (id, ticketData) => {
  const response = await api.put(`/admin/tickets/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/admin/tickets/${id}`);
  return response.data;
};

export const getTicketsWithFilters = async (filters = {}) => {
  // Build query string from filters object
  const params = new URLSearchParams();
  
  if (filters.assignedToUserId) {
    params.append('assignedToUserId', filters.assignedToUserId);
  }
  if (filters.createdByUserId) {
    params.append('createdByUserId', filters.createdByUserId);
  }
  if (filters.status) {
    params.append('status', filters.status);
  }
  if (filters.labelId) {
    params.append('labelId', filters.labelId);
  }
  if (filters.myAssigned) {
    params.append('myAssigned', 'true');
  }
  
  const queryString = params.toString();
  const url = `/users/tickets${queryString ? '?' + queryString : ''}`;
  
  const response = await api.get(url);
  return response.data;
};

export const getUnassignedTickets = async () => {
  const response = await api.get('/admin/tickets/un-assigned');
  return response.data;
};

export const assignUserToTicket = async (ticketId, userEmail) => {
  const response = await api.put(`/admin/tickets/${ticketId}/assign`, {
    userMail: userEmail
  });
  return response.data;
};