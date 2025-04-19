import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUserRank = async (userId, rank) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/rank`, { rank });
    return response.data;
  } catch (error) {
    console.error('Error updating user rank:', error);
    throw error;
  }
};