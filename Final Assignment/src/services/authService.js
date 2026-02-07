import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;
  
    localStorage.setItem('token', token);
    
    return {
      token,
      user,
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};