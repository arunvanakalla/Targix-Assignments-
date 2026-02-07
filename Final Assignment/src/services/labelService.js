import api from './api';

export const getAllLabels = async () => {
  const response = await api.get('/labels');
  return response.data;
};

