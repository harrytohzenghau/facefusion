import axios from 'axios';

// Base URL of our backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// register new user
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  


// get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
