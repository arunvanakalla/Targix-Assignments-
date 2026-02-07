import api from './api';

export const getCommentsByTicket = async (ticketId) => {
  const response = await api.get(`/users/tickets/${ticketId}/comments`);
  return response.data;
};

export const createComment = async (ticketId, content) => {
  const response = await api.post(`/users/tickets/${ticketId}/comments`, { content });
  return response.data;
};