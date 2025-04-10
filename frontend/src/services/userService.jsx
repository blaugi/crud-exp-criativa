import axios from 'axios';

const API_URL = 'http://localhost:9090';

const userService = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get a specific user
  getUser: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },


  updateUser: async (id, userData) => {
  try {
    // Ensure id is valid
    if (!id) {
      throw new Error('User ID is required');
    }

    // Log data for debugging
    console.log('Updating user:', id, userData);
    
    const response = await axios.put(`${API_URL}/usuarios/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    
    // Improved error logging
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    }
    
    throw error;
  }
},

  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
};

export default userService;